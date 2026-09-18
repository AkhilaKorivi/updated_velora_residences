import { useCallback, useState } from "react";
import PageLoader from "./components/PageLoader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProjectIntro from "./components/ProjectIntro";
import ProjectStats from "./components/ProjectStats";
import ResidenceSelector from "./components/ResidenceSelector";
import FloorPlanViewer from "./components/FloorPlanViewer";
import Amenities from "./components/Amenities";
import LifestyleSection from "./components/LifestyleSection";
import Gallery from "./components/Gallery";
import LocationSection from "./components/LocationSection";
import Specifications from "./components/Specifications";
import VirtualTour from "./components/VirtualTour";
import Footer, { ScrollToTop } from "./components/Footer";
import ContactCTA from "./components/ContactCTA";
import EnquiryModal from "./components/EnquiryModal";
import { EnquiryProvider } from "./components/EnquiryContext";
import { PlanProvider } from "./components/PlanContext";

export default function App() {
  const [intro, setIntro] = useState(false);
  const onLoaderDone = useCallback(() => setIntro(true), []);

  return (
    <EnquiryProvider>
      <PlanProvider>
        <PageLoader onDone={onLoaderDone} />
        <Navbar />
        <main>
          <Hero intro={intro} />
          <Marquee />
          <ProjectIntro />
          <ProjectStats />
          <ResidenceSelector />
          <FloorPlanViewer />
          <Amenities />
          <LifestyleSection />
          <Gallery />
          <LocationSection />
          <Specifications />
          <VirtualTour />
        </main>
        <Footer />
        <ScrollToTop />
        <ContactCTA />
        <EnquiryModal />
      </PlanProvider>
    </EnquiryProvider>
  );
}