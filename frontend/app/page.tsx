import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className='flex flex-col justify-center items-center'>
        <Image src='/img/numentech.png' width={500} height={300} alt="Logotipo de Numentech" />
        <h1 className=" text-3xl font-semibold bg-gradient-radial from-slate-500 to-slate-600 inline-block text-transparent bg-clip-text">Prueba técnica Full Stack Developer</h1>
        <span className="text-slate-500">Sergio Moyano Romero</span>
      </div>
    </div>
  );
}
