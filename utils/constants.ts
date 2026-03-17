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
      "Restauramos llantas dañadas con precisión, recuperando su forma y seguridad para un rendimiento óptimo en cada trayecto.",
    imageSrc: reparacionimage,
  },
  {
    title: "Rotación de Neumáticos",
    description:
      "Distribuimos el desgaste de los neumáticos de manera uniforme, prolongando su vida útil y mejorando la estabilidad del vehículo.",
    imageSrc: rotacionImage,
  },
  {
    title: "Reparación de Tren Delantero y Sistema de Suspensión",
    description:
      "Ajustamos y reparamos componentes clave para garantizar una conducción estable, segura y libre de vibraciones.",
    imageSrc: trenDelanteroimage,
  },
  {
    title: "Mantenimiento y Reparación del Sistema de Frenos",
    description:
      "Revisamos y optimizamos el sistema de frenos para asegurar una respuesta eficaz y máxima seguridad en todo momento.",
    imageSrc: frenosimage,
  },
  {
    title: "Sustitución y Servicio de Amortiguadores",
    description:
      "Mejoramos la absorción de impactos y el control del vehículo, brindando mayor confort y estabilidad en cada recorrido.",
    imageSrc: suspensionImage,
  },
  {
    title: "Lavadero",
    description:
      "Dejamos tu vehículo impecable por dentro y por fuera, cuidando cada detalle para una presentación perfecta.",
    imageSrc: lavadero,
  },
  {
    title: "Lubricentro",
    description:
      "Realizamos cambios de aceite y lubricación completa para proteger el motor y asegurar su óptimo funcionamiento.",
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
