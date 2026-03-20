import alineacionImage from "@/public/images/servicios/alineacionBalanceo.jpg";
import reparacionimage from "@/public/images/servicios/reparacionLlantas.jpg";
import rotacionImage from "@/public/images/servicios/rotacion.jpg";
import trenDelanteroimage from "@/public/images/servicios/trenDelantero.jpg";
import frenosimage from "@/public/images/servicios/frenos.png";
import suspensionImage from "@/public/images/servicios/suspension.jpg";
import lubricentroImage from "@/public/images/servicios/lubricentro.jpg";
import lavadero from "@/public/images/servicios/limpieza.jpg";
import cafe from "@/public/images/servicios/cafe.jpg";

import colocacion from "@/public/images/hero/colocacion.png";
import cuotas from "@/public/images/hero/cuotas.png";
import efectivo from "@/public/images/hero/efectivo.png";

import nuevos from "@/public/images/productos/nuevos.png";
import precurados from "@/public/images/productos/precurados.png";

import auto from "@/public/images/productos/auto.png";
import camioneta from "@/public/images/productos/camioneta.png";
import camion from "@/public/images/productos/camion.png";
import tractor from "@/public/images/productos/tractor.png";
import autobg from "@/public/images/productos/autobg.jpg";
import camionetabg from "@/public/images/productos/camionetabg.jpg";
import camionbg from "@/public/images/productos/camionbg.jpg";
import tractorbg from "@/public/images/productos/tractorbg.jpg";

import pirelli from "@/public/images/marcas/pirelli.png";
import bridgestone from "@/public/images/marcas/bridgestone.png";
import michelin from "@/public/images/marcas/michelin.png";
import goodyear from "@/public/images/marcas/goodyear.png";
import bfgoodrich from "@/public/images/marcas/bfgoodrich.png";
import firemax from "@/public/images/marcas/firemax.png";
import haida from "@/public/images/marcas/haida.png";
import maxam from "@/public/images/marcas/maxam.png";
import lorgian from "@/public/images/marcas/lorgian.png";
import sailun from "@/public/images/marcas/sailun.png";
import triangle from "@/public/images/marcas/triangle.png";
import bkt from "@/public/images/marcas/bkt.png";
import kumho from "@/public/images/marcas/kumho.png";

export const services = [
  {
    title: "Alineación y Balance de precisión",
    description:
      "Optimizamos la dirección y el rodado para un manejo suave, evitando el desgaste irregular y garantizando la estabilidad total en ruta.",
    imageSrc: alineacionImage,
  },
  {
    title: "Reparación profesional de Llantas",
    description:
      "Reparamos todo tipo de daños en tus llantas con técnicas profesionales para devolverles su rendimiento y garantizar tu seguridad en ruta.",
    imageSrc: reparacionimage,
  },
  {
    title: "Rotación de Neumáticos",
    description:
      "Intercambiamos tus neumáticos estratégicamente para distribuir el desgaste de manera uniforme y prolongar su vida útil al máximo.",
    imageSrc: rotacionImage,
  },
  {
    title: "Reparación de Tren Delantero y Sistema de Suspensión",
    description:
      "Diagnosticamos y corregimos fallas en la suspensión y el tren delantero para que tu vehículo responda con precisión en cada curva.",
    imageSrc: trenDelanteroimage,
  },
  {
    title: "Mantenimiento y Reparación del Sistema de Frenos",
    description:
      "Inspeccionamos y reparamos pastillas, discos y líquido de frenos para que tu auto detenga siempre de forma segura y confiable.",
    imageSrc: frenosimage,
  },
  {
    title: "Sustitución y Servicio de Amortiguadores",
    description:
      "Reemplazamos amortiguadores gastados para devolverte la estabilidad, el confort y el control que tu vehículo necesita en ruta.",
    imageSrc: suspensionImage,
  },
  {
    title: "Lavadero",
    description:
      "Lavamos tu vehículo de forma completa, interior y exterior, con productos que cuidan la pintura y dejan cada rincón impecable.",
    imageSrc: lavadero,
  },
  {
    title: "Lubricentro",
    description:
      "Realizamos el cambio de aceite y lubricación completa para mantener tu motor protegido y funcionando en óptimas condiciones.",
    imageSrc: lubricentroImage,
  },
  {
    title: "Cafetería",
    description:
      "Disfrutá de un espacio cómodo con café y opciones rápidas mientras esperamos que tu vehículo esté listo.",
    imageSrc: cafe,
  },
];

export const heroData = [
  {
    title: "Colocación gratis",
    subtitle: "Nos encargamos del montaje sin costos adicionales",
    imageSrc: colocacion.src,
  },
  {
    title: "Cuotas sin interés",
    subtitle: "Aprovechá nuestras opciones de pago en cuota",
    imageSrc: cuotas.src,
  },
  {
    title: "Descuento en efectivo",
    subtitle: "Obtené bonificación especial si decidís pagar en efectivo",
    imageSrc: efectivo.src,
  },
];

export const products = [
  {
    title: "Neumáticos Nuevos",
    description:
      "Ofrecemos un catálogo completo de marcas líderes para autos, camionetas, camiones y maquinaria agrícola. Nos enfocamos en brindar neumáticos de última tecnología que garantizan el máximo agarre, seguridad y eficiencia en el consumo de combustible para cualquier tipo de terreno.",
    imageSrc: nuevos.src,
  },
  {
    title: "Neumáticos Precurados",
    description:
      "Es una opción inteligente para reducir costos sin resignar seguridad. Utilizando bandas de primera calidad Goodyear, renovamos la vida útil de sus cascos con un rendimiento equivalente al de un neumático nuevo, siendo la solución más económica y sustentable para su flota.",
    imageSrc: precurados.src,
  },
];

export const productTypes = [
  {
    type: "Autos",
    title: "Seguridad y confort en la ciudad",
    description:
      "Ofrecemos una amplia selección de neumáticos diseñados para brindar un andar suave, máximo agarre en frenado y una eficiencia de combustible superior. La mejor tecnología para el uso diario de tu vehículo.",
    bgImageSrc: autobg.src,
    mainImageSrc: auto.src,
  },
  {
    type: "Camionetas",
    title: "Potencia para todo terreno",
    description:
      "Equipamos tu pick-up con neumáticos de alta resistencia, ideales tanto para el asfalto como para caminos exigentes. Durabilidad garantizada y tracción optimizada para que nada detenga tu carga o tu aventura.",
    bgImageSrc: camionetabg.src,
    mainImageSrc: camioneta.src,
  },
  {
    type: "Camiones",
    title: "Máximo rendimiento para el transporte",
    description:
      "Soluciones robustas diseñadas para flotas pesadas. Nos enfocamos en neumáticos de alto kilometraje y resistencia estructural, asegurando que tu unidad pase más tiempo en la ruta y menos en el taller.",
    bgImageSrc: camionbg.src,
    mainImageSrc: camion.src,
  },
  {
    type: "Vial y Agrícola",
    title: "Tracción pesada para el trabajo duro",
    description:
      "Entendemos las exigencias del campo y la construcción. Proveemos neumáticos de gran flotación y resistencia a cortes, optimizados para maquinaria pesada que requiere estabilidad y fuerza en superficies complejas.",
    bgImageSrc: tractorbg.src,
    mainImageSrc: tractor.src,
  },
];

export const brands = [
  { name: "Pirelli", imageSrc: pirelli.src },
  { name: "Bridgestone", imageSrc: bridgestone.src },
  { name: "Michelin", imageSrc: michelin.src },
  { name: "Firemax", imageSrc: firemax.src },
  { name: "Goodyear", imageSrc: goodyear.src },
  { name: "BFGoodrich", imageSrc: bfgoodrich.src },
  { name: "Haida", imageSrc: haida.src },
  { name: "Maxam", imageSrc: maxam.src },
  { name: "Lorgian", imageSrc: lorgian.src },
  { name: "Sailun", imageSrc: sailun.src },
  { name: "Triangle", imageSrc: triangle.src },
  { name: "BKT", imageSrc: bkt.src },
  { name: "Kumho", imageSrc: kumho.src },
];
