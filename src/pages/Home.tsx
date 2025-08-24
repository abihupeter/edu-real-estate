import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ServicesSection from "@/components/home/ServicesSection";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProperties />
      <ServicesSection />
    </Layout>
  );
};

export default Home;