import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

import logo from "../assets/rhino_logo.png";
import authImage from "../assets/hero3.png";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loginWithGoogle, resetPassword } = useAuth();

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading("email");
      setError("");
      setSuccess("");
      await login(formData.email.trim(), formData.password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError(t("auth.login.loginError"));
    } finally {
      setLoading(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading("google");
      setError("");
      setSuccess("");

      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      setError(t("auth.login.googleError"));
    } finally {
      setLoading(null);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      setSuccess("");
      setError(t("auth.login.enterEmailFirst"));
      return;
    }

    try {
      setLoading("reset");
      setError("");
      setSuccess("");

      await resetPassword(formData.email.trim());

      setSuccess(t("auth.login.resetSuccess"));
    } catch (error) {
      console.error("Password reset failed:", error);
      setError(t("auth.login.resetError"));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-brand-cream px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <SEO
        title="Login | Rhino Tours & Travels"
        description="Sign in to your Rhino Tours & Travels account."
        path="/login"
        noIndex
      />
      <div className="mx-auto grid max-w-[1180px] overflow-hidden rounded-[28px] border border-brand-border/60 bg-white shadow-[0_18px_50px_rgba(11,47,42,0.10)] lg:grid-cols-[1fr_0.9fr]">
        <div className="relative hidden min-h-[620px] overflow-hidden lg:block">
          <img
            src={authImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/30 to-transparent" />

          <div className="absolute bottom-0 left-0 z-10 p-10 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
              {t("auth.login.imageEyebrow")}
            </p>

            <h2 className="mt-3 max-w-[430px] font-serif text-4xl font-semibold leading-tight">
              {t("auth.login.imageTitle")}
            </h2>

            <p className="mt-4 max-w-[420px] text-sm leading-6 text-white/75">
              {t("auth.login.imageDescription")}
            </p>
          </div>
        </div>

        <div className="flex items-center px-5 py-8 sm:px-10 sm:py-10 lg:px-12">
          <div className="mx-auto w-full max-w-[440px]">
            <Link to="/" className="mb-7 inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Rhino Tours and Travels"
                className="h-14 w-14 object-contain"
              />

              <div>
                <p className="font-serif text-lg font-semibold text-brand-dark">
                  Rhino Tours & Travels
                </p>

                <p className="text-[10px] tracking-[0.16em] text-brand-muted">
                  EXPLORE NORTHEAST INDIA
                </p>
              </div>
            </Link>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              {t("auth.login.eyebrow")}
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold text-brand-dark sm:text-[42px]">
              {t("auth.login.title")}
            </h1>

            <p className="mt-2 text-sm leading-6 text-brand-muted">
              {t("auth.login.description")}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("auth.email")}
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("auth.emailPlaceholder")}
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-[#FAF8F2] pl-10 pr-4 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-xs font-semibold text-brand-dark"
                  >
                    {t("auth.password")}
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={loading !== null}
                    className="text-xs font-medium text-brand-orange transition-colors hover:text-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading === "reset"
                      ? t("auth.login.sendingReset")
                      : t("auth.login.forgotPassword")}
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("auth.login.passwordPlaceholder")}
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-[#FAF8F2] pl-10 pr-11 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword
                        ? t("auth.hidePassword")
                        : t("auth.showPassword")
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted transition hover:text-brand-dark"
                  >
                    {showPassword ? (
                      <EyeOff size={18} aria-hidden="true" />
                    ) : (
                      <Eye size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading !== null}
                className="h-12 w-full rounded-xl bg-brand-orange text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
              >
                {loading === "email" && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {t("auth.login.button")}
              </button>
            </form>

            {error && (
              <p role="alert" className="mt-3 text-center text-sm text-red-500">
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="mt-3 text-center text-sm text-brand-green"
              >
                {success}
              </p>
            )}

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-brand-border" />
              <span className="text-xs text-brand-muted">{t("auth.or")}</span>
              <span className="h-px flex-1 bg-brand-border" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading !== null}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-brand-border bg-white text-sm font-medium text-brand-dark transition-colors hover:bg-brand-cream"
            >
              {loading === "google" ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-green/30 border-t-brand-green" />
              ) : (
                <FcGoogle size={21} aria-hidden="true" />
              )}
              {t("auth.login.google")}
            </button>

            <p className="mt-6 text-center text-sm text-brand-muted">
              {t("auth.login.noAccount")}{" "}
              <Link
                to="/signup"
                className="font-semibold text-brand-orange hover:text-brand-orange-dark"
              >
                {t("auth.signupLink")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
