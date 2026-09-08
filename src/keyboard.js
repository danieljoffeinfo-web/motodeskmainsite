import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** Real-time geometry, not a flattened reference screenshot. Logo assets stay local. */
export async function createKeyboard(host, integrations, onSelect, initiallyPaused) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(29, 1, 0.1, 100);
  camera.position.set(0, 9.8, 10.5);
  camera.lookAt(0, 0, 0.25);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x25232a, 2.1));
  const keyLight = new THREE.DirectionalLight(0xffffff, 4.1);
  keyLight.position.set(-4, 10, -2); keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  Object.assign(keyLight.shadow.camera, { left: -12, right: 12, top: 8, bottom: -8, near: 1, far: 30 });
  keyLight.shadow.bias = -0.001; keyLight.shadow.normalBias = 0.025;
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xcbd9e5, 2);
  rimLight.position.set(8, 5, -5); scene.add(rimLight);
  const warmLight = new THREE.PointLight(0xffa987, 8, 15, 2);
  warmLight.position.set(-7, 2, 3); scene.add(warmLight);

  const board = new THREE.Group();
  board.rotation.y = -0.06; board.rotation.z = -0.025;
  scene.add(board);
  const matte = color => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.16 });
  function box(width, height, depth, radius, material, x, y, z, parent = board) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 4, radius), material);
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  box(16.35, 0.42, 5.55, 0.21, new THREE.MeshStandardMaterial({ color: 0x747679, metalness: .78, roughness: .32 }), 0, -0.15, 0);
  box(16.20, 0.12, 5.43, 0.14, matte(0x393a3d), 0, 0.105, 0);
  box(15.99, 0.055, 5.18, 0.13, matte(0x121315), 0, 0.182, 0);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), new THREE.ShadowMaterial({ opacity: 0.35 }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -0.65; shadow.receiveShadow = true; scene.add(shadow);

  const keyMaterial = matte(0x252629);
  const lighterMaterial = matte(0x313236);
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f4, roughness: .37, metalness: .02 });
  const logoKeys = [];
  const hitTargets = [];
  const animatedKeys = [];
  const textures = [];
  const fontFamily = 'Arial, sans-serif';

  function labelTexture(text, width, isBrand = false) {
    const canvas = document.createElement('canvas'); canvas.width = Math.round(256 * width); canvas.height = 256;
    const context = canvas.getContext('2d');
    if (isBrand) {
      context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillStyle = '#e9e9ed'; context.font = `600 38px ${fontFamily}`;
      context.fillText('motodesk', canvas.width / 2 + 25, 130);
    } else {
      context.fillStyle = '#9c9da3'; context.textAlign = 'left'; context.textBaseline = 'top'; context.font = `500 ${text.length > 4 ? 25 : 33}px ${fontFamily}`;
      context.fillText(text, 35, 34);
    }
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); textures.push(texture); return texture;
  }
  const loader = new THREE.TextureLoader();
  const imageTextures = await Promise.all(integrations.map(async item => {
    const texture = await loader.loadAsync(item.src);
    texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); textures.push(texture); return texture;
  }));
  const brandTexture = await loader.loadAsync('/motodesk-mark.svg'); brandTexture.colorSpace = THREE.SRGBColorSpace; textures.push(brandTexture);

  function addKey(x, z, width, depth, text = '', integration = -1, special = '') {
    const group = new THREE.Group(); group.position.set(x, 0.27, z); board.add(group);
    const material = integration >= 0 ? whiteMaterial.clone() : special === 'escape' ? matte(0x714039) : special === 'space' ? lighterMaterial : keyMaterial;
    const key = box(width - .065, .35, depth - .065, .09, material, 0, .12, 0, group);
    const top = box(width - .15, .055, depth - .15, .055, material, 0, .292, -.012, group);
    group.userData = { integration, baseY: .27, until: 0, offset: 0 };
    key.userData.group = group; top.userData.group = group; hitTargets.push(key, top);
    if (integration >= 0) {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(.64, .64), new THREE.MeshBasicMaterial({ map: imageTextures[integration], transparent: true, depthWrite: false, toneMapped: false }));
      plane.rotation.x = -Math.PI / 2; plane.position.set(0, .327, -.005); group.add(plane);
      logoKeys[integration] = group;
    } else if (special === 'brand') {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(.5,.5), new THREE.MeshBasicMaterial({ map: brandTexture, transparent: true, depthWrite:false, toneMapped:false }));
      plane.rotation.x = -Math.PI/2; plane.position.set(0,.327,0); group.add(plane);
    } else if (text) {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(width-.13, depth-.12), new THREE.MeshBasicMaterial({ map: labelTexture(text, width, special === 'space'), transparent: true, depthWrite:false, toneMapped:false }));
      plane.rotation.x = -Math.PI/2; plane.position.set(0,.327,0); group.add(plane);
      if(special === 'space') {
        const mark = new THREE.Mesh(new THREE.PlaneGeometry(.21,.21), new THREE.MeshBasicMaterial({ map:brandTexture, transparent:true, depthWrite:false, toneMapped:false }));
        mark.rotation.x=-Math.PI/2;mark.position.set(-.39,.33,0);group.add(mark);
      }
    }
    animatedKeys.push(group); return group;
  }
  // A compact 75% layout, with two central rows dedicated to the integration ecosystem.
  const unit = 1.04;
  const start = -7.8;
  const rows = [
    [ ['esc',1,'escape'], ...Array.from({length:12},(_,i)=>[`F${i+1}`,1]), ['⌫',2] ],
    [ ['tab',1.5], ['Q',1], ['W',1], ['E',1], ['@0',1], ['@1',1], ['@2',1], ['@3',1], ['I',1], ['O',1], ['P',1], ['[',1], [']',1], ['\\',1.5] ],
    [ ['caps',1.75], ['A',1], ['S',1], ['D',1], ['@4',1], ['@5',1], ['@6',1], ['@7',1], ['K',1], ['L',1], [';',1], ["'",1], ['return',2.25] ],
    [ ['shift',2.25], ['Z',1], ['X',1], ['C',1], ['V',1], ['B',1], ['N',1], ['M',1], [',',1], ['.',1], ['/',1], ['shift',1.75], ['↑',1] ],
    [ ['fn',1,'brand'], ['ctrl',1], ['opt',1], ['⌘',1.25], ['motodesk',5.5,'space'], ['⌘',1.25], ['opt',1], ['←',1], ['↓',1], ['→',1] ],
  ];
  rows.forEach((row, rowIndex) => {
    let cursor = start;
    row.forEach(([text,width,special]) => {
      const integration = text.startsWith('@') ? Number(text.slice(1)) : -1;
      addKey(cursor + width*unit/2, -2.08 + rowIndex*1.02, width*unit-.025, rowIndex===0?.79:.92, integration>=0?'':text, integration, special);
      cursor += width*unit;
    });
  });
  // Hardware indicator lights echo the exact Moto Desk traffic-light mark.
  [0xff5f57,0xfebc2e,0x28c840].forEach((color, i) => {
    const led = new THREE.Mesh(new THREE.SphereGeometry(.032,10,8), new THREE.MeshBasicMaterial({color}));
    led.position.set(-7.3+i*.14, .075, 2.778); board.add(led);
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(-10,-10);
  let hovered = null;
  let paused = initiallyPaused;
  let visible = true;
  let tiltX = 0, tiltY = 0;
  let automaticIndex = -1, lastAuto = 0;
  let lastTime = 0;
  function resize() {
    const width = host.clientWidth, height = host.clientHeight;
    renderer.setSize(width,height,false); camera.aspect = width/height;
    // Fit the complete case at every viewport; never crop off the logo keys on mobile.
    const aspect = width/height;
    camera.position.set(0, 9.8, 10.5);
    const fit = Math.max(1, 2.9/aspect);
    camera.position.multiplyScalar(fit); camera.lookAt(0,0,0.25); camera.updateProjectionMatrix();
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host); resize();
  const visibilityObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { rootMargin:'120px' });
  visibilityObserver.observe(host);
  function updatePointer(event) {
    const rect = host.getBoundingClientRect();
    pointer.set(((event.clientX-rect.left)/rect.width)*2-1, -((event.clientY-rect.top)/rect.height)*2+1);
    tiltX = pointer.y*.025; tiltY = pointer.x*.025;
  }
  host.addEventListener('pointermove', updatePointer);
  host.addEventListener('pointerleave', () => { pointer.set(-10,-10); tiltX=0;tiltY=0;hovered=null;host.style.cursor='default'; });
  host.addEventListener('click', event => {
    updatePointer(event); raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObjects(hitTargets,false)[0];
    const group=hit?.object.userData.group;
    if(group){group.userData.until=performance.now()+220;if(group.userData.integration>=0)onSelect(group.userData.integration);}
  });

  function frame(time) {
    if (!visible || document.hidden) return;
    const dt=Math.min((time-lastTime)/1000,.05); lastTime=time;
    if(!paused && time-lastAuto>2400){automaticIndex=(automaticIndex+1)%integrations.length;logoKeys[automaticIndex].userData.until=time+230;lastAuto=time;}
    raycaster.setFromCamera(pointer,camera);
    hovered=raycaster.intersectObjects(hitTargets,false)[0]?.object.userData.group || null;
    host.style.cursor=hovered?.userData.integration>=0?'pointer':'default';
    for(const group of animatedKeys){
      const target=time<group.userData.until?-.12:group===hovered?.035:0;
      group.userData.offset=THREE.MathUtils.damp(group.userData.offset,target,18,dt);
      group.position.y=group.userData.baseY+group.userData.offset;
    }
    if(!paused){board.rotation.x=THREE.MathUtils.damp(board.rotation.x,tiltX+Math.sin(time*.0003)*.011,3,dt);board.rotation.y=THREE.MathUtils.damp(board.rotation.y,-.06+tiltY,3,dt);board.position.y=Math.sin(time*.0007)*.035;}
    renderer.render(scene,camera);
  }
  renderer.setAnimationLoop(frame);
  renderer.render(scene,camera);
  renderer.domElement.addEventListener('webglcontextlost', event => {event.preventDefault();renderer.setAnimationLoop(null);host.dispatchEvent(new CustomEvent('keyboard-unavailable'));});
  return { press(index){if(logoKeys[index])logoKeys[index].userData.until=performance.now()+250;},setPaused(value){paused=value;} };
}
