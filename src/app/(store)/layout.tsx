"use client";
import Footer from "@/components/store/footer";
import StoreNavBar from "@/components/store/navbar";
import ProgressBar from "@/components/UI/progress-bar";
import { shoppingCartStore } from "@/store/shoppingCart";
import { Provider } from "react-redux";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Provider store={shoppingCartStore}>
        <StoreNavBar />
        <ProgressBar />
        {children}
        <Footer />
      </Provider>
    </main>
  );
};

export default StoreLayout;
