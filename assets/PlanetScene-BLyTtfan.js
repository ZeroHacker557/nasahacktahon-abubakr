import{a as e,c as t,r as n}from"./index-CU04sjIX.js";import{At as r,Ct as i,Ot as a,_ as o,_t as s,gt as c,i as l,jt as u,m as d,n as f,ot as p,t as m,z as h}from"./react-three-fiber.esm-Cf7Q_7qz.js";import{t as g}from"./OrbitControls-B1JDcM6D.js";var _=t(e(),1),v=n(),y=2.05,b=`./textures/planets/`;function x(e,t,n){return Math.sin(e*5.3+Math.sin(n*4.7))*Math.cos(t*6.2+n*2.7)+Math.sin(e*13.1+t*8.3)*Math.cos(n*11.7-t*5.1)*.35+Math.sin(n*31.7+e*26.2)*Math.cos(t*29.2)*.12}function S(e){let t=new Uint8Array(524288);for(let n=0;n<256;n++){let r=(n/256-.5)*Math.PI;for(let i=0;i<512;i++){let a=i/512*Math.PI*2,o=Math.cos(r)*Math.cos(a),s=Math.sin(r),c=x(o,s,Math.cos(r)*Math.sin(a)),l=(n*512+i)*4;if(e===`earth`){let e=c>.18,n=Math.abs(s)>.96-c*.025;t[l]=n?208:e?65+c*36:10,t[l+1]=n?222:e?78+c*27:38+c*5,t[l+2]=n?226:e?45+c*17:64+c*8}else t[l]=155+c*34,t[l+1]=91+c*25,t[l+2]=64+c*19;t[l+3]=255}}let n=new o(t,512,256);return n.colorSpace=s,n.wrapS=c,n.magFilter=h,n.minFilter=h,n.needsUpdate=!0,n}function C(e,t,n){let[r,i]=(0,_.useState)({world:e,ready:!1});return(0,_.useEffect)(()=>{let r=!1,o=[],l=new a,u=e===`earth`?[[`color`,t===`ultra`?`earth-day.jpg`:`earth-day-2k.jpg`,!0],[`clouds`,`earth-clouds.png`,!1],[`normal`,`earth-normal.jpg`,!1],[`specular`,`earth-specular.jpg`,!1]]:[[`color`,t===`ultra`?`mars-color.jpg`:`mars-color-2k.jpg`,!0]];return i({world:e,ready:!1}),Promise.all(u.map(([e,t,i])=>new Promise(a=>{l.load(b+t,t=>{r?(t.dispose(),a([e,void 0])):(t.colorSpace=i?s:``,t.anisotropy=n,t.wrapS=c,o.push(t),a([e,t]))},void 0,()=>a([e,void 0]))}))).then(t=>{r||i({world:e,ready:!0,...Object.fromEntries(t)})}),()=>{r=!0,o.forEach(e=>e.dispose())}},[e,t,n]),r.world===e?r:{world:e,ready:!1}}var w=`
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`,T=`
  uniform vec3 uColor;
  uniform vec3 uSun;
  uniform float uStrength;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec3 eye = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vWorldNormal);
    float rim = pow(1.0 - abs(dot(normal, eye)), 4.0);
    float sun = smoothstep(-0.4, 0.7, dot(normal, normalize(uSun)));
    float glow = rim * mix(0.12, 1.0, sun) * uStrength;
    gl_FragColor = vec4(uColor * (0.72 + sun * 0.55), glow);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,E=`
  uniform sampler2D uClouds;
  uniform vec3 uSun;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  void main() {
    vec4 cloud = texture2D(uClouds, vUv);
    float density = dot(cloud.rgb, vec3(0.3333)) * cloud.a;
    float sun = max(dot(normalize(vWorldNormal), normalize(uSun)), 0.0);
    vec3 color = vec3(0.81, 0.87, 0.94) * (0.075 + sun * 1.65);
    gl_FragColor = vec4(color, smoothstep(0.08, 0.88, density) * 0.88);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function D({quality:e}){let t=(0,_.useMemo)(()=>{let t=e===`ultra`?2100:500,n=new Float32Array(t*3),r=93017,i=()=>(r=r*16807%2147483647,(r-1)/2147483646);for(let e=0;e<t;e++){let t=i()*Math.PI*2,r=i()*2-1,a=65+i()*40,o=Math.sqrt(1-r*r);n.set([a*o*Math.cos(t),a*r,a*o*Math.sin(t)],e*3)}return n},[e]);return(0,v.jsxs)(`points`,{frustumCulled:!1,children:[(0,v.jsx)(`bufferGeometry`,{children:(0,v.jsx)(`bufferAttribute`,{attach:`attributes-position`,args:[t,3]})}),(0,v.jsx)(`pointsMaterial`,{color:`#b6c6df`,size:.065,sizeAttenuation:!0,transparent:!0,opacity:.52,depthWrite:!1})]})}function O({world:e,lighting:t,quality:n,wireframe:a,autoRotate:o,onReady:s}){let{gl:c}=l(),p=C(e,n,Math.min(c.capabilities.getMaxAnisotropy(),n===`ultra`?8:2)),m=(0,_.useMemo)(()=>S(e),[e]),h=(0,_.useRef)(null),g=(0,_.useMemo)(()=>new u(t===`blue`?-5:-4.5,t===`day`?3:2.8,t===`day`?7.5:4.2),[t]),b=(0,_.useMemo)(()=>({uColor:{value:new d(e===`earth`?`#4794ed`:`#c77a50`)},uSun:{value:g},uStrength:{value:e===`earth`?.78:.3}}),[e,g]),D=(0,_.useMemo)(()=>({uClouds:{value:p.clouds},uSun:{value:g}}),[p.clouds,g]),O=(0,_.useMemo)(()=>{let t=new i(y,n===`ultra`?192:96,n===`ultra`?128:48);if(e===`mars`){let e=t.attributes.position,n=new u;for(let t=0;t<e.count;t++){n.fromBufferAttribute(e,t).normalize();let r=x(n.x*3,n.y*3,n.z*3)*.0025;n.multiplyScalar(y+r),e.setXYZ(t,n.x,n.y,n.z)}t.computeVertexNormals()}return t},[e,n]);return(0,_.useEffect)(()=>()=>m.dispose(),[m]),(0,_.useEffect)(()=>()=>O.dispose(),[O]),(0,_.useEffect)(()=>{p.ready&&s?.()},[p.ready,s]),f((e,t)=>{o&&h.current&&(h.current.rotation.y+=Math.min(t,.1)*.0025)}),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`ambientLight`,{intensity:e===`earth`?.07:.1,color:`#8195b4`}),(0,v.jsx)(`directionalLight`,{position:g,intensity:t===`day`?2.25:1.95,color:t===`golden`?`#ffe2c1`:t===`blue`?`#b2d1ff`:`#fff9f0`}),(0,v.jsx)(`directionalLight`,{position:[5,-2,-5],intensity:.035,color:`#729ad9`}),(0,v.jsxs)(`group`,{rotation:[.05,e===`earth`?-1.5:.4,.13],children:[(0,v.jsx)(`mesh`,{geometry:O,children:(0,v.jsx)(`meshPhongMaterial`,{map:p.color??m,color:e===`mars`?`#e4c6b3`:`#ffffff`,normalMap:e===`earth`?p.normal:void 0,normalScale:new r(.65,.65),bumpMap:e===`mars`?p.color:void 0,bumpScale:.025,specularMap:e===`earth`?p.specular:void 0,specular:e===`earth`?`#69839a`:`#332a25`,shininess:e===`earth`?38:7,wireframe:a})}),e===`earth`&&p.clouds&&!a&&(0,v.jsxs)(`mesh`,{ref:h,children:[(0,v.jsx)(`sphereGeometry`,{args:[2.0639999999999996,n===`ultra`?128:64,n===`ultra`?96:32]}),(0,v.jsx)(`shaderMaterial`,{vertexShader:w,fragmentShader:E,uniforms:D,transparent:!0,depthWrite:!1})]})]}),!a&&(0,v.jsxs)(`mesh`,{children:[(0,v.jsx)(`sphereGeometry`,{args:[y+(e===`earth`?.055:.035),n===`ultra`?128:64,n===`ultra`?96:32]}),(0,v.jsx)(`shaderMaterial`,{vertexShader:w,fragmentShader:T,uniforms:b,side:1,transparent:!0,blending:2,depthWrite:!1})]})]})}function k({cameraPreset:e,autoRotate:t}){let n=(0,_.useRef)(null),{camera:r,size:i,invalidate:a}=l(),o=(0,_.useRef)(new u(0,.65,8.6)),s=(0,_.useMemo)(()=>new u,[]),c=(0,_.useRef)(!0);return(0,_.useEffect)(()=>{if(r instanceof p){let e=i.width>900?Math.min(180,i.width*.13):i.width>650?65:0;r.setViewOffset(i.width,i.height,-e,i.height>650?10:0,i.width,i.height),r.updateProjectionMatrix(),a()}},[r,i.width,i.height,a]),(0,_.useEffect)(()=>{e===`overhead`?o.current.set(.2,7.6,4.1):e===`close`?o.current.set(.15,.35,6.6):o.current.set(0,.65,8.6),c.current=!0,a()},[e,a]),f((e,t)=>{if(!c.current)return;let i=1-Math.exp(-Math.min(t,.1)*3.5);r.position.lerp(o.current,i),n.current?.target.lerp(s,i),n.current?.update(),r.position.distanceTo(o.current)<.015?c.current=!1:a()}),(0,v.jsx)(g,{ref:n,enableDamping:!0,dampingFactor:.06,enablePan:!1,minDistance:4.5,maxDistance:14,rotateSpeed:.42,zoomSpeed:.65,autoRotate:t,autoRotateSpeed:.35,onChange:()=>a(),onStart:()=>{c.current=!1}})}function A(e){return(0,v.jsxs)(m,{camera:{position:[0,.65,8.6],fov:34,near:.1,far:180},dpr:e.quality===`ultra`?[1,1.7]:1,frameloop:e.autoRotate?`always`:`demand`,gl:{antialias:e.quality===`ultra`,alpha:!1,powerPreference:`default`},onCreated:({gl:e})=>{e.toneMapping=4,e.toneMappingExposure=1.05},style:{position:`absolute`,inset:0,background:`#03060d`},fallback:(0,v.jsx)(`div`,{role:`status`,children:`3D ko‘rinish uchun WebGL qo‘llab-quvvatlanadigan brauzer kerak.`}),children:[(0,v.jsx)(`color`,{attach:`background`,args:[`#03060d`]}),(0,v.jsx)(D,{quality:e.quality}),(0,v.jsx)(O,{...e}),(0,v.jsx)(k,{cameraPreset:e.cameraPreset,autoRotate:e.autoRotate})]})}export{A as default};