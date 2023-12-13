import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


//door texture
const doorAlphatexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusiontexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorColortexture= textureLoader.load('./textures/door/color.jpg')
const doorMetalnesstexture = textureLoader.load('./textures/door/metalness.jpg')
const doornormaltexture = textureLoader.load('./textures/door/normal.jpg')
const doorroughnesstexture = textureLoader.load('./textures/door/roughness.jpg')
const doorheighttexture = textureLoader.load('./textures/door/height.jpg')

//wall texture

const wallColortexture = textureLoader.load('./textures/bricks/color.jpg')
const wallambientOcclusiontexture = textureLoader.load('./textures/bricks/ambientOcclusion.jpg')
const wallnormaltexture = textureLoader.load('./textures/bricks/normal.jpg')
const wallroughnesstexture = textureLoader.load('./textures/bricks/roughness.jpg')

//floor texture 


const grassColortexture = textureLoader.load('./textures/grass/color.jpg')
const grassambientOcclusiontexture = textureLoader.load('./textures/grass/ambientOcclusion.jpg')
const grassnormaltexture = textureLoader.load('./textures/grass/normal.jpg')
const grassroughnesstexture = textureLoader.load('./textures/grass/roughness.jpg')

doorColortexture.colorSpace = THREE.SRGBColorSpace
wallColortexture.colorSpace = THREE.SRGBColorSpace
grassColortexture.colorSpace = THREE.SRGBColorSpace

grassColortexture.repeat.set(8,8)
grassambientOcclusiontexture.repeat.set(8,8)
grassnormaltexture.repeat.set(8,8)
grassroughnesstexture.repeat.set(8,8)

grassColortexture.wrapS = THREE.RepeatWrapping
grassambientOcclusiontexture.wrapS = THREE.RepeatWrapping
grassnormaltexture.wrapS = THREE.RepeatWrapping
grassroughnesstexture.wrapS = THREE.RepeatWrapping

grassColortexture.wrapT = THREE.RepeatWrapping
grassambientOcclusiontexture.wrapT = THREE.RepeatWrapping
grassnormaltexture.wrapT = THREE.RepeatWrapping
grassroughnesstexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
//House container

const house = new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(new THREE.BoxGeometry(4,2.5,4), new THREE.MeshStandardMaterial( {
    map : wallColortexture,
    aoMap: wallambientOcclusiontexture,
    normalMap: wallnormaltexture,
    roughnessMap: wallroughnesstexture

} ))

walls.position.y = 1.25
house.add(walls)

//roof

const roof = new THREE.Mesh(new THREE.ConeGeometry(3,2,4), new THREE.MeshStandardMaterial({color : '#b35f45'}))
roof.position.y = 3.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)


//Door 

const door = new THREE.Mesh(new THREE.PlaneGeometry(2.2,2.2,100,100), new THREE.MeshStandardMaterial({
    map : doorColortexture,
    transparent: true,
    alphaMap : doorAlphatexture,
    aoMap : doorAmbientOcclusiontexture,
    metalnessMap: doorMetalnesstexture,
    normalMap: doornormaltexture,
    roughnessMap: doorroughnesstexture,
    displacementMap: doorheighttexture,
    displacementScale: 0.1


}))
door.position.z = 2.01
door.position.y = 0.9
house.add(door)

//Bush 

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854' })


const bush1 = new THREE.Mesh(bushGeometry,bushMaterial)
bush1.position.set(1,0,2.3)
bush1.scale.set(0.4,0.4,0.4)

const bush2 = new THREE.Mesh(bushGeometry,bushMaterial)
bush2.position.set(- 1.3,0,2.1)
bush2.scale.set(0.6,0.6,0.6)

const bush3 = new THREE.Mesh(bushGeometry,bushMaterial)
bush3.position.set(- 1.5,0,2.7)
bush3.scale.set(0.2,0.2,0.2)

const bush4 = new THREE.Mesh(bushGeometry,bushMaterial)
bush4.position.set(1.5,0,2.1)
bush4.scale.set(0.2,0.2,0.2)

house.add(bush1,bush2,bush3,bush4)

// Grave

const graveGeometry = new THREE.BoxGeometry(0.7,0.9,0.2)
const graveMaterial = new THREE.MeshStandardMaterial()


const Graves = new THREE.Group()
scene.add(Graves)

for (let i = 0; i < 50 ; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    //mesh
    const grave = new THREE.Mesh(graveGeometry,graveMaterial)

    //Position
    grave.position.set(x,0.3,z)
    grave.castShadow = true
    //Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    Graves.add(grave)
    
}


//Ghosts 

const ghost1 = new THREE.PointLight( '#ff00ff',6,3)
scene.add(ghost1)
const ghost2 = new THREE.PointLight( '#00ffff',6,3)
scene.add(ghost2)
const ghost3 = new THREE.PointLight( '#ffff00',6,3)
scene.add(ghost3)


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map : grassColortexture,
        aoMap: grassambientOcclusiontexture,
        normalMap: grassnormaltexture,
        roughnessMap: grassroughnesstexture

    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)





/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.26)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//DoorLight

const doorLight = new THREE.PointLight('#ff7d46', 3,7)
doorLight.position.set(0,2.2,2.7)

scene.add(doorLight)

//*** Fog */

scene.fog = new THREE.Fog('#262837', 1 ,15)

 /**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Shadow

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow= true 
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true



moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15



doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7



ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7



ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7



ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const angleghost1 = elapsedTime * 0.5
    ghost1.position.x = Math.cos(angleghost1) * 4
    ghost1.position.z = Math.sin(angleghost1) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const angleghost2 = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(angleghost2) * 5
    ghost2.position.z =  Math.sin(angleghost2) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4 ) + Math.sin(elapsedTime*2.5)

    const angleghost3 = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(angleghost3) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z =  Math.sin(angleghost3) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4 ) + Math.sin(elapsedTime*2.5)
    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick() 