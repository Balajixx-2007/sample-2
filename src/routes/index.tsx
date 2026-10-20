import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar, FloorIndicator } from "@/components/vk/Navbar";
import { Hero, Doors } from "@/components/vk/Hero";
import { About } from "@/components/vk/About";
import { Services } from "@/components/vk/Services";
import { WhyUs, Process } from "@/components/vk/WhyProcess";
import { Testimonials, Contact, Footer, CallNow } from "@/components/vk/Contact";
import { SmoothScroll } from "@/components/vk/shared";

const title = "VK Elevators | Lift Installation, Maintenance, Repair & Modernization";
const description =
  "VK Elevators delivers reliable elevator installation, 24/7 maintenance, fast repair and modernization for homes, hospitals, malls and commercial buildings.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <SmoothScroll />
      <Navbar />
      <FloorIndicator />
      <Hero />
      <Doors />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <CallNow />
      <Toaster />
    </main>
  );
}
