import Image from "next/image";

export default function ImagemAleatoria() {
    const imageUrl = "https://picsum.photos/1200/800";

    return (
        <div className="hidden flex-col items-center w-full h-full relative md:flex">
            <Image
                src={imageUrl}
                alt="Uma imagem bem legal"
                fill
                className="object-cover"
            />
        </div>
    )
}