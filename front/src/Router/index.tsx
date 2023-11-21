import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { Home } from '../view/pages/Home';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { MainLayout } from '../view/layouts/MainLayout';
import { Evaluations } from '../view/pages/Evaluations';

import { Answer } from '../view/pages/Answer';
import Tabs from '../view/components/Tabs';

import { EditProfile } from '../view/pages/EditProfile';
import { Thanks } from '../view/pages/Answer/Thanks';
import { ResetPassword } from '../view/pages/ResetPassword';
import { Help } from '../view/pages/Help/Help';
import { President } from '../view/pages/President';
import { Campaign } from '../view/pages/Campaign';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<MainLayout />}>
            <Route path="/nps" element={<Tabs />} />
            <Route path="/help" element={<Help />} />

            <Route path="/avaliacoes" element={<Evaluations />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Route>
        </Route>

        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
        <Route path="/president" element={<President />} />
        <Route path="/candidateCampaign" element={<Campaign />} />

        </Route>


        <Route path="/answer/1/:id/:origin" element={<Answer />} />
        <Route path="/thanks" element={<Thanks />} />

      </Routes>
    </BrowserRouter>
  );
}
