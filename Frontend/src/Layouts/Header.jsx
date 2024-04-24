import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

import { CiChat1, CiUser, CiBookmarkPlus, CiLogin } from "react-icons/ci";
import {
  MdSupport,
  MdOutlineConfirmationNumber,
  MdOutlinePayment,
  MdSupportAgent,
} from "react-icons/md";
import { FcAdvertising } from "react-icons/fc";
import { SlNote } from "react-icons/sl";
import { IoExitOutline } from "react-icons/io5";
import { FaShop, FaClockRotateLeft } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";

import { getProfile } from "Services/user";
import { e2p } from "Utils/number";
import styles from "./Header.module.css";

function Header() {
  const [dropDown, setDropDown] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleLogout = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    setDropDown(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} alt="logo" />
        </Link>
        <span>
          <img src="location.svg" className={styles.location} alt="location" />
          <p>تهران</p>
        </span>
      </div>
      <div className={styles.profile}>
        {data ? (
          <span className={styles.dropdownBox} onClick={toggleDropDown}>
            <img src="profile.svg" alt="profile" />
            <p>دیوار من</p>
          </span>
        ) : (
          <Link to="/auth">
            <span>
              <CiLogin />
              <p>ورود</p>
            </span>
          </Link>
        )}

        {dropDown && data && (
          <ul className={styles.dropdown} ref={dropdownRef}>
            <li>
              <Link
                to={data?.data?.role === "ADMIN" ? "/admin" : "/dashboard"}
                onClick={() => setDropDown(false)}
              >
                <div>
                  {data?.data?.role === "ADMIN" ? (
                    <>
                      <RiAdminLine />
                      <p>ادمین دیوار</p>
                    </>
                  ) : (
                    <>
                      <CiUser />
                      <p>کاربر دیوار</p>
                    </>
                  )}
                </div>
                <div>
                  {data ? (
                    <p> تلفن: {e2p(` ${+data?.data?.mobile}`)}</p>
                  ) : (
                    "ورود"
                  )}
                </div>
              </Link>
            </li>
            <li>
              <MdOutlineConfirmationNumber />
              <p>تایید هویت</p>
            </li>
            <li>
              <FcAdvertising />
              <p>آگهی‌های من</p>
            </li>
            <li>
              <MdOutlinePayment />
              <p>پرداخت‌های من</p>
            </li>
            <li>
              <CiBookmarkPlus />
              <p>نشان‌ها</p>
            </li>
            <li>
              <SlNote />
              <p>یاداشت ها</p>
            </li>
            <li>
              <FaClockRotateLeft />
              <p>بازدید‌های اخیر</p>
            </li>
            <li>
              <MdSupportAgent />
              <p>گزارش کلاهبرداری</p>
            </li>
            <li>
              <FaShop />
              <p>دیوار برای کسب‌وکار‌ها</p>
            </li>
            <li onClick={handleLogout}>
              <IoExitOutline />
              <p>خروج</p>
            </li>
          </ul>
        )}
        <Link to="/dashboard">
          <span>
            <CiChat1 />
            <p>چت</p>
          </span>
        </Link>
        <Link>
          <span>
            <MdSupport />
            <p>پشتیبانی</p>
          </span>
        </Link>
        <Link to="/dashboard" className={styles.btn}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
