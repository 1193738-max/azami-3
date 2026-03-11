import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NightCollection from "@/components/NightCollection";
import BeachCollection from "@/components/BeachCollection";
import ShapeSection from "@/components/ShapeSection";
import BestSellers from "@/components/BestSellers";
import BrandStory from "@/components/BrandStory";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <NightCollection />
        <BeachCollection />
        <ShapeSection />
        <BestSellers />
        <BrandStory />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
