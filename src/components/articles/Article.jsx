import Image from "next/image";

const Article = ({ title, articles }) => {
  return (
    <div className="flex flex-col gap-12">
      <p className="text-2xl leading-6 font-medium md:text-5xl md:leading-custom-50">
        {title}
      </p>
      <div className="w-full overflow-scroll no-scrollbar">
        <div className="flex gap-12 w-fit pr-[10vw]">
          {articles.map(({ image_url }, index) => (
            <Image
              key={index}
              src={image_url}
              alt="article"
              width={425}
              height={700}
              className="w-[212px] h-[350px] md:w-[425px] md:h-[700px] rounded-[40px] object-cover cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Article;
