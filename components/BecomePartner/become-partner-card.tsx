import Image from "next/image";

export type BecomePartnerCardData = {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type BecomePartnerCardProps = {
  card: BecomePartnerCardData;
};

export function BecomePartnerCard({ card }: BecomePartnerCardProps) {
  return (
    <article className="group h-full rounded-[4px] bg-transparent transition-transform duration-500 ease-out hover:-translate-y-1">
      <div className="relative aspect-[3/4.5] overflow-hidden rounded-[3px] border border-[#CBD2D9]">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="pt-4">
        <h3 className="text-[16px] leading-[1.2] font-bold text-[#1C242B]">
          {card.title}
        </h3>

        <p className="mt-1 text-[15px] leading-[1.45] font-medium italic text-primary">
          {card.subtitle}
        </p>

        <p className="mt-1.5 text-[14px] leading-[1.5] font-normal text-[#555E66]">
          {card.description}
        </p>
      </div>
    </article>
  );
}
