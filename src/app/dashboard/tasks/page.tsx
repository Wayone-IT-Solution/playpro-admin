"use client";

import dayjs from "dayjs";
import React from "react";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import AuthGuard from "@/components/AuthGuard";
import Wrapper from "@/components/common/Wrapper";
import DoctorSlotsManager from "./components/DoctorSlotsManager";

dayjs.extend(weekday);
dayjs.extend(isoWeek);

export default function CalendarPage() {
  return (
    <AuthGuard>
      <Wrapper>
        <DoctorSlotsManager />
      </Wrapper>
    </AuthGuard>
  );
}
