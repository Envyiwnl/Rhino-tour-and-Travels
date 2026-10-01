import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

import logo from "../assets/rhino_logo.png";
import authImage from "../assets/hero3.png";

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    try {
      setLoading("email");
      setError("");

      await signup(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(null);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading("google");
      setError("");

      await loginWithGoogle();

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-brand-cream px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <SEO
        title="Sign Up | Rhino Tours & Travels"
        description="Create your Rhino Tours & Travels account."
        path="/signup"
        noIndex
      />

      <div className="mx-auto grid max-w-[1180px] overflow-hidden rounded-[28px] border border-brand-border/60 bg-white shadow-[0_18px_50px_rgba(11,47,42,0.10)] lg:grid-cols-[1fr_0.9fr]">
        <div className="relative hidden min-h-[680px] overflow-hidden lg:block">
          <img
            src={authImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/30 to-transparent" />

          <div className="absolute bottom-0 left-0 z-10 p-10 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
              {t("auth.signup.imageEyebrow")}
            </p>

            <h2 className="mt-3 max-w-[430px] font-serif text-4xl font-semibold leading-tight">
              {t("auth.signup.imageTitle")}
            </h2>

            <p className="mt-4 max-w-[420px] text-sm leading-6 text-white/75">
              {t("auth.signup.imageDescription")}
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
              {t("auth.signup.eyebrow")}
            </p>

            <h1
              id="signup-title"
              className="mt-2 font-serif text-4xl font-semibold text-brand-dark sm:text-[42px]"
            >
              {t("auth.signup.title")}
            </h1>

            <p className="mt-2 text-sm leading-6 text-brand-muted">
              {t("auth.signup.description")}
            </p>

            <form
              onSubmit={handleSubmit}
              aria-labelledby="signup-title"
              className="mt-7 space-y-4"
            >
              <div>
                <label
                  htmlFor="signup-name"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("auth.name")}
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="signup-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("auth.namePlaceholder")}
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-[#FAF8F2] pl-10 pr-4 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
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
                    id="signup-email"
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
                <label
                  htmlFor="signup-password"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("auth.password")}
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("auth.passwordPlaceholder")}
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

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("auth.confirmPassword")}
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder={t("auth.confirmPasswordPlaceholder")}
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-[#FAF8F2] pl-10 pr-11 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? t("auth.hidePassword")
                        : t("auth.showPassword")
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted transition hover:text-brand-dark"
                  >
                    {showConfirmPassword ? (
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
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading === "email" && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                )}

                {t("auth.signup.button")}
              </button>
            </form>

            {error && (
              <p role="alert" className="mt-3 text-center text-sm text-red-500">
                {error}
              </p>
            )}

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-brand-border" />
              <span className="text-xs text-brand-muted">{t("auth.or")}</span>
              <span className="h-px flex-1 bg-brand-border" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading !== null}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-brand-border bg-white text-sm font-medium text-brand-dark transition-colors hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading === "google" ? (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-brand-green/30 border-t-brand-green"
                />
              ) : (
                <FcGoogle size={21} aria-hidden="true" />
              )}

              {t("auth.signup.google")}
            </button>

            <p className="mt-6 text-center text-sm text-brand-muted">
              {t("auth.signup.hasAccount")}{" "}
              <Link
                to="/login"
                className="font-semibold text-brand-orange hover:text-brand-orange-dark"
              >
                {t("auth.loginLink")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
