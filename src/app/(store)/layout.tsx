"use client";
import Footer from "@/components/store/footer";
import StoreNavBar from "@/components/store/navbar";
import ProgressBar from "@/components/UI/progress-bar";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StoreNavBar />
      <ProgressBar />
      {children}
      <Footer />
    </main>
  );
};

export default StoreLayout;
