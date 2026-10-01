import { useState } from "react";
import {
  ChevronDown,
  Globe2,
  LogOut,
  Menu,
  Search,
  UserRound,
  MapPin,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../customHooks/useAuth";

import logo from "../assets/rhino_logo.png";
import navDecoration from "../assets/decorative_leaf.png";

const navLinks = [
  {
    label: "navbar.home",
    path: "/",
  },
  {
    label: "navbar.about",
    path: "/about",
  },
  {
    label: "navbar.destinations",
    path: "/destinations",
  },
];

const languages = [
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
  },
  {
    code: "hi",
    label: "हिन्दी",
    shortLabel: "HI",
  },
  {
    code: "as",
    label: "অসমীয়া",
    shortLabel: "AS",
  },
];

const searchDestinations = [
  { key: "kaziranga", path: "/destinations/kaziranga" },
  { key: "dawki", path: "/destinations/dawki" },
  { key: "selaPass", path: "/destinations/sela-pass" },
  { key: "nongriat", path: "/destinations/nongriat" },
  { key: "tawang", path: "/destinations/tawang" },
  { key: "cherrapunji", path: "/destinations/cherrapunji" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [search, setSearch] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, authLoading, logout } = useAuth();

  const currentLanguage =
    languages.find((language) => language.code === i18n.resolvedLanguage) ||
    languages[0];

  const userLabel =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "";

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    setIsMenuOpen(false);
    setIsSearchFocused(false);
    setActiveSuggestionIndex(-1);
    e.currentTarget.querySelector("input")?.blur();

    if (!query) {
      navigate("/destinations");
      return;
    }

    navigate(`/destinations?search=${encodeURIComponent(query)}`);
  };

  const searchSuggestions = search.trim()
    ? searchDestinations
        .map((destination) => ({
          ...destination,
          name: t(`destinations.items.${destination.key}.name`),
          state: t(`destinations.items.${destination.key}.state`),
        }))
        .filter((destination) => {
          const query = search.trim().toLowerCase();

          return (
            destination.name.toLowerCase().includes(query) ||
            destination.state.toLowerCase().includes(query)
          );
        })
        .slice(0, 5)
    : [];

  const handleSuggestionSelect = (path) => {
    setSearch("");
    setIsSearchFocused(false);
    setActiveSuggestionIndex(-1);
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleSearchKeyDown = (e) => {
    if (!searchSuggestions.length) {
      if (e.key === "Escape") {
        setIsSearchFocused(false);
        setActiveSuggestionIndex(-1);
        e.currentTarget.blur();
      }

      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveSuggestionIndex((prev) =>
        prev >= searchSuggestions.length - 1 ? 0 : prev + 1,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveSuggestionIndex((prev) =>
        prev <= 0 ? searchSuggestions.length - 1 : prev - 1,
      );
    }

    if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault();

      handleSuggestionSelect(searchSuggestions[activeSuggestionIndex].path);
    }

    if (e.key === "Escape") {
      e.preventDefault();

      setIsSearchFocused(false);
      setActiveSuggestionIndex(-1);
      e.currentTarget.blur();
    }
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setIsLanguageOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  };

  const navLinkClasses = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:rounded-full after:bg-brand-orange after:transition-all after:duration-300 ${
      isActive
        ? "text-brand-orange after:w-full"
        : "text-brand-dark after:w-0 hover:text-brand-orange hover:after:w-full"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border/70 bg-brand-cream/95 backdrop-blur-md">
      <img
        src={navDecoration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 z-0 hidden w-[360px] opacity-40 lg:block xl:w-[420px]"
      />

      <div className="relative z-10 mx-auto flex h-[72px] w-full max-w-[1500px] items-center px-4 sm:px-6 lg:h-[80px] lg:px-8 xl:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <img
            src={logo}
            alt="Rhino Tours and Travels"
            className="h-12 w-12 object-contain sm:h-14 sm:w-14 lg:h-[62px] lg:w-[62px]"
          />

          <div className="hidden leading-none sm:block">
            <p className="font-serif text-[19px] font-bold tracking-tight text-brand-green lg:text-[21px]">
              Rhino Tours
            </p>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-orange lg:text-[10px]">
              & Travels
            </p>
          </div>
        </Link>

        <form
          role="search"
          onSubmit={handleSearch}
          className="relative ml-6 hidden min-w-[240px] flex-1 sm:block lg:max-w-[390px] xl:ml-8 xl:max-w-[440px]"
        >
          <Search
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveSuggestionIndex(-1);
            }}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              setIsSearchFocused(false);
              setActiveSuggestionIndex(-1);
            }}
            onKeyDown={handleSearchKeyDown}
            aria-activedescendant={
              activeSuggestionIndex >= 0
                ? `destination-option-${searchSuggestions[activeSuggestionIndex]?.key}`
                : undefined
            }
            role="combobox"
            aria-expanded={isSearchFocused && searchSuggestions.length > 0}
            aria-controls="destination-search-suggestions"
            aria-autocomplete="list"
            placeholder={t("navbar.searchPlaceholder")}
            aria-label={t("navbar.searchPlaceholder")}
            className="h-11 w-full rounded-full border border-brand-border bg-white pl-11 pr-4 text-sm text-brand-dark transition-all duration-200 placeholder:text-brand-muted focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
          />
          {isSearchFocused && searchSuggestions.length > 0 && (
            <div
              id="destination-search-suggestions"
              role="listbox"
              className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-brand-border bg-white py-2 shadow-xl"
            >
              {searchSuggestions.map((destination, index) => (
                <button
                  key={destination.key}
                  id={`destination-option-${destination.key}`}
                  type="button"
                  role="option"
                  tabIndex={-1}
                  aria-selected={activeSuggestionIndex === index}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handleSuggestionSelect(destination.path);
                  }}
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeSuggestionIndex === index
                      ? "bg-brand-cream"
                      : "hover:bg-brand-cream"
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                    <MapPin
                      size={16}
                      aria-hidden="true"
                      className="text-brand-orange"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brand-dark">
                      {destination.name}
                    </p>

                    <p className="mt-0.5 text-xs text-brand-muted">
                      {destination.state}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </form>

        <nav className="ml-6 hidden shrink-0 items-center gap-5 lg:flex xl:ml-8 xl:gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              end={link.path === "/"}
              className={navLinkClasses}
            >
              {t(link.label)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-6 hidden shrink-0 items-center gap-1 lg:flex xl:ml-8 xl:gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              aria-expanded={isLanguageOpen}
              aria-controls="language-options"
              aria-label={`${t("navbar.language")}: ${currentLanguage.label}`}
              className="flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium text-brand-green transition-colors hover:bg-brand-green/5 xl:px-3"
            >
              <Globe2 size={17} strokeWidth={1.8} aria-hidden="true" />

              <span>{currentLanguage.shortLabel}</span>

              <ChevronDown
                size={15}
                strokeWidth={1.8}
                aria-hidden="true"
                className={`transition-transform duration-200 ${
                  isLanguageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLanguageOpen && (
              <div
                id="language-options"
                className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[150px] overflow-hidden rounded-xl border border-brand-border bg-white py-1.5 shadow-xl"
              >
                {languages.map((language) => {
                  const isActive = currentLanguage.code === language.code;

                  return (
                    <button
                      key={language.code}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-brand-green/5 font-semibold text-brand-green"
                          : "text-brand-dark hover:bg-brand-cream"
                      }`}
                    >
                      <span>{language.label}</span>

                      <span className="text-[10px] font-semibold uppercase text-brand-muted">
                        {language.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {authLoading ? (
            <div
              role="status"
              aria-label={t("navbar.loadingAccount")}
              className="flex h-10 w-[130px] items-center justify-center"
            >
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-brand-green/25 border-t-brand-green"
              />
            </div>
          ) : isAuthenticated ? (
            <>
              <div className="flex max-w-[145px] items-center gap-2 rounded-full px-2.5 py-2 text-sm font-semibold text-brand-green">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                    <UserRound size={16} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                )}

                <span className="truncate">{userLabel}</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                aria-label={t("navbar.logout")}
                className="flex h-10 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/5 xl:px-3"
              >
                <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />

                <span className="hidden 2xl:inline">{t("navbar.logout")}</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-3 py-2.5 text-sm font-semibold text-brand-green transition-colors duration-200 hover:bg-brand-green/5 xl:px-4"
              >
                {t("navbar.login")}
              </Link>

              <Link
                to="/signup"
                className="whitespace-nowrap rounded-full bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-orange-dark hover:shadow-md xl:px-5"
              >
                {t("navbar.signup")}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? t("navbar.closeMenu") : t("navbar.openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-brand-green/5 sm:ml-4 lg:hidden"
        >
          {isMenuOpen ? (
            <X size={24} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Menu size={25} strokeWidth={1.8} aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className={`overflow-hidden border-brand-border/70 bg-brand-cream transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? "max-h-[720px] border-t opacity-100"
            : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-[1500px] px-4 pb-6 pt-5 sm:px-6">
          <form
            role="search"
            onSubmit={handleSearch}
            className="relative mb-5 sm:hidden"
          >
            <Search
              size={18}
              strokeWidth={1.8}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveSuggestionIndex(-1);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                setIsSearchFocused(false);
                setActiveSuggestionIndex(-1);
              }}
              onKeyDown={handleSearchKeyDown}
              aria-activedescendant={
                activeSuggestionIndex >= 0
                  ? `mobile-destination-option-${searchSuggestions[activeSuggestionIndex]?.key}`
                  : undefined
              }
              role="combobox"
              aria-expanded={isSearchFocused && searchSuggestions.length > 0}
              aria-controls="mobile-destination-search-suggestions"
              aria-autocomplete="list"
              placeholder={t("navbar.searchPlaceholder")}
              aria-label={t("navbar.searchPlaceholder")}
              className="h-12 w-full rounded-full border border-brand-border bg-white pl-11 pr-4 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
            />
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div
                id="mobile-destination-search-suggestions"
                role="listbox"
                className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-brand-border bg-white py-2 shadow-xl"
              >
                {searchSuggestions.map((destination, index) => (
                  <button
                    key={destination.key}
                    id={`mobile-destination-option-${destination.key}`}
                    type="button"
                    role="option"
                    tabIndex={-1}
                    aria-selected={activeSuggestionIndex === index}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      handleSuggestionSelect(destination.path);
                    }}
                    onMouseEnter={() => setActiveSuggestionIndex(index)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      activeSuggestionIndex === index
                        ? "bg-brand-cream"
                        : "hover:bg-brand-cream"
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10">
                      <MapPin
                        size={16}
                        aria-hidden="true"
                        className="text-brand-orange"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-brand-dark">
                        {destination.name}
                      </p>

                      <p className="mt-0.5 text-xs text-brand-muted">
                        {destination.state}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>

          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `border-b border-brand-border/60 py-4 text-[15px] font-medium transition-colors ${
                    isActive
                      ? "text-brand-orange"
                      : "text-brand-dark hover:text-brand-orange"
                  }`
                }
              >
                {t(link.label)}
              </NavLink>
            ))}
          </nav>

          <div className="border-b border-brand-border/60 py-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-green">
              <Globe2 size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{t("navbar.language")}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {languages.map((language) => {
                const isActive = currentLanguage.code === language.code;

                return (
                  <button
                    key={language.code}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`min-h-10 rounded-full border px-2 py-2 text-xs font-medium transition-all sm:text-sm ${
                      isActive
                        ? "border-brand-green bg-brand-green text-white"
                        : "border-brand-border bg-white text-brand-dark hover:border-brand-green"
                    }`}
                  >
                    {language.label}
                  </button>
                );
              })}
            </div>
          </div>

          {authLoading ? (
            <div
              role="status"
              aria-label={t("navbar.loadingAccount")}
              className="flex h-20 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className="h-5 w-5 animate-spin rounded-full border-2 border-brand-green/25 border-t-brand-green"
              />
            </div>
          ) : isAuthenticated ? (
            <div className="mt-6 rounded-2xl border border-brand-border bg-white p-4">
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                    <UserRound size={20} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-brand-dark">
                    {userLabel}
                  </p>

                  <p className="truncate text-xs text-brand-muted">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-green text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green hover:text-white"
              >
                <LogOut size={17} strokeWidth={1.8} aria-hidden="true" />
                {t("navbar.logout")}
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex h-11 items-center justify-center rounded-full border border-brand-green text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/5"
              >
                {t("navbar.login")}
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="flex h-11 items-center justify-center rounded-full bg-brand-orange text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
              >
                {t("navbar.signup")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
