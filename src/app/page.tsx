import portfolioData from "@/data/portfolio.json";
import { PortfolioData } from "@/types/portfolio";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

const data = portfolioData as PortfolioData;

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Hero data={data.personal} />
        <About />
        <Skills data={data.skills} />
        <Experience data={data.experience} />
        <Education education={data.education} languages={data.languages} />
        <Projects data={data.projects} />
        <Contact data={data.personal} />
      </main>
      <footer className="bg-slate-900 text-center text-slate-500 text-sm py-6">
        © {new Date().getFullYear()} {data.personal.name}
      </footer>
    </>
  );
}
