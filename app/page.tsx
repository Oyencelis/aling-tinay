import Hero from "@/components/scenes/Hero";
import Intro from "@/components/scenes/Intro";
import ManiScene from "@/components/scenes/ManiScene";
import CornickScene from "@/components/scenes/CornickScene";
import Process from "@/components/scenes/Process";
import Gallery from "@/components/scenes/Gallery";
import Stats from "@/components/scenes/Stats";
import Marquee from "@/components/Marquee";
import Visit from "@/components/scenes/Visit";
import End from "@/components/scenes/End";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ManiScene />
      <CornickScene />
      <Process />
      <Gallery />
      <Stats />
      <section
        aria-label="Lahat ng snack, tuloy-tuloy"
        className="relative overflow-hidden border-y border-cream/15 bg-brown pb-6 pt-8 md:pb-8 md:pt-11"
      >
        <Marquee className="text-cream" speed={72} outline={false} />
        <div className="mt-5 border-t border-cream/15 pt-4 text-corn">
          <Marquee
            reverse
            speed={44}
            size="sm"
            stroke="#F2B705"
            items={[
              "Sulit",
              "Crunchy",
              "Pang-masa",
              "Bagong luto araw-araw",
              "Pritong mani",
              "Cornick",
            ]}
          />
        </div>
      </section>
      <Visit />
      <End />
    </>
  );
}
