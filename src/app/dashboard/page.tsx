"use client";

import Home from "@/components/dashboard/Home";
import Wrapper from "@/components/common/Wrapper";
import AuthGuard from "../../components/AuthGuard";

const Dashboard: React.FC = () => {
  return (
    <AuthGuard>
      <Wrapper>
        <Home />
      </Wrapper>
    </AuthGuard>
  );
};

export default Dashboard;
