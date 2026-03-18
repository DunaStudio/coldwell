import Image from "next/image";
import bgContacto from "@/public/images/contacto/fondo.jpg";

export default function ContactSection() {
  return (
    <section
      id="#contacto"
      className="w-full relative flex flex-col items-center pt-25 mt-10 font-sans"
    >
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="w-full flex-1 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-top grayscale"
            style={{
              backgroundImage: `url(${bgContacto.src})`,
              backgroundAttachment: "fixed",
            }}
          />
        </div>
        <div className="w-full h-45 bg-primary"></div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[40px] font-normal px-12 py-2 z-30 leading-none">
        Contacto
      </div>

      <div className="relative z-20 w-full max-w-268 flex flex-col shadow-2xl">
        <div className="w-full flex h-124.25 bg-white">
          <div className="w-full md:w-[60%] p-10 flex flex-col justify-between h-full bg-white">
            <form className="flex flex-col gap-5 h-full">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="text-[20px] text-tertiary font-light border-l-[3px] border-primary pl-2 leading-none">
                    Nombre y apellido
                  </label>
                  <input
                    type="text"
                    placeholder="Ingrese su nombre y apellido"
                    className="bg-[#F5F5F5] h-11.5 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-[14px] font-light text-tertiary placeholder:text-tertiary/60 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label className="text-[20px] text-tertiary font-light border-l-[3px] border-primary pl-2 leading-none">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Ingrese su email"
                    className="bg-[#F5F5F5] h-11.5 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-[14px] font-light text-tertiary placeholder:text-tertiary/60 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[20px] text-tertiary font-light border-l-[3px] border-primary pl-2 leading-none">
                  Consulta
                </label>
                <input
                  type="text"
                  placeholder="Motivo consulta"
                  className="bg-[#F5F5F5] h-11.5 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-[14px] font-light text-tertiary placeholder:text-tertiary/60 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-[20px] text-tertiary font-light border-l-[3px] border-primary pl-2 leading-none">
                  Mensaje
                </label>
                <textarea
                  placeholder="Ingrese su mensaje aquí"
                  className="bg-[#F5F5F5] h-full p-4 focus:outline-none focus:ring-1 focus:ring-primary text-[14px] font-light text-tertiary placeholder:text-tertiary/60 resize-none transition-all"
                ></textarea>
              </div>

              <button
                type="button"
                className="bg-primary text-white text-[20px] border border-primary font-light py-3 w-full hover:bg-white hover:text-primary hover:border-primary transition-all ease-in-out duration-200 mt-2 cursor-pointer"
              >
                Enviar
              </button>
            </form>
          </div>

          <div className="hidden md:block md:w-[40%] relative bg-white overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-[115%] h-[115%]">
              <Image
                src="/images/contacto/ruedas.png"
                alt="Ruedas Coldwell"
                fill
                className="object-contain"
                style={{ objectPosition: "right bottom" }}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-88.75 bg-[#F0F0F0]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.0886475752533!2d-68.52841492361251!3d-31.54923287420078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96813f6e80c76717%3A0xe4bdfcbe3c17785!2sColdwell%20Neumaticos!5e0!3m2!1ses-419!2sar!4v1710526849999!5m2!1ses-419!2sar"
            className="w-full h-full border-0 opacity-90 grayscale-30"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
