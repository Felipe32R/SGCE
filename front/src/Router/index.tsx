import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/Register";
import { Home } from "../view/pages/Home";
import { AuthLayout } from "../view/layouts/AuthLayout";
import { MainLayout } from "../view/layouts/MainLayout";

import { Answer } from "../view/pages/Answer";

import { Thanks } from "../view/pages/Answer/Thanks";

import { President } from "../view/pages/President";
import { Campaign } from "../view/pages/Campaign";
import { CandidatesByState } from "../view/pages/CandidatesByState";
import ProfileCandidate from "../view/pages/ProfileCandidate";
import RegisterCampaign from "../view/pages/RegisterCampaign";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<MainLayout />}>
            <Route path="/profileCandidate" element={<ProfileCandidate />} />
            <Route path="/registerCampaign" element={<RegisterCampaign />} />
            
          </Route>
        </Route>

        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/president" element={<President />} />
          <Route path="/candidates" element={<CandidatesByState />} />

          <Route path="/candidateCampaign" element={<Campaign />} />
        </Route>

        <Route path="/answer/1/:id/:origin" element={<Answer />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </BrowserRouter>
  );
}
