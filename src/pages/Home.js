import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import FilterSection from "../components/FilterSection";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const { user, loading, error } = useSelector((state) => state.auth);

  return (
    <Layout>
      <HeroSection></HeroSection>
      <FilterSection></FilterSection>
    </Layout>
  );
};

export default Home;
