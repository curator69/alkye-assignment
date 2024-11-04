import Article from "@/components/articles/Article";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [articles, setArticles] = useState({ state: "loading", data: [] });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-up");
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URI}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const categorizedArticles = Object.values(
          response.data.reduce((acc, article) => {
            if (!acc[article.prompt]) {
              acc[article.prompt] = { title: article.prompt, articles: [] };
            }
            acc[article.prompt].articles.push(article);
            return acc;
          }, {})
        );
        setArticles({ status: "idle", data: categorizedArticles });
      })
      .catch((error) => {
        console.log("Error fetching articles:", error);
      });
  }, []);

  return (
    <div className="pt-[10vw] pb-[10vh] pl-[10vw] flex flex-col gap-12">
      <Image
        src="./light-logo.svg"
        alt="Logo"
        width={136}
        height={59}
        className="cursor-pointer w-[70px] h-[30px] md:w-[136px] md:h-[59px]"
      />
      <div>
        <p className="text-2xl leading-6 font-medium md:text-5xl md:leading-custom-50">
          Welcome <span className="underline">Test</span>
        </p>
        <p className="text-xs leading-6 font-semibold md:text-2xl md:leading-custom-50">
          Hope you having a good day!
        </p>
      </div>

      {articles.state === "loading" ? (
        <div className="flex flex-col gap-8 justify-center items-center h-fit">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          <p>Loading articles...</p>
        </div>
      ) : (
        articles.data.map(({ title, articles }, index) => (
          <Article key={index} title={title} articles={articles} />
        ))
      )}
    </div>
  );
}
