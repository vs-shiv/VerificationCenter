import { Route, Routes } from "react-router-dom";
import VerificationCenter from "../pages/VerificationCenter";
import VerificationCenterNew from "../pages/VerificationCenterNew";
import YumBrandsStructure from "../pages/YumBrandsStructure ";
import { MainLayout } from "../layouts/MainLayout";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<VerificationCenter />} />
        <Route path="/new" element={<VerificationCenterNew />} />
        <Route
          path="/new/yum-brands-structure"
          element={<YumBrandsStructure />}
        />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
