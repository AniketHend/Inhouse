"use client";

import classNames from "classnames";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
    ArticleIcon,
    CollapsIcon,
    HomeIcon,
    LogoIcon,
    LogoutIcon,
    UsersIcon,
    VideosIcon,
} from "../../../public/icons";
import axios from "axios";
import toast from "react-hot-toast";

const menuItems = [
    { id: 1, label: "Home", icon: HomeIcon, link: "/sidebar" },
    { id: 2, label: "Analyser", icon: ArticleIcon, link: "/analyser" },
    { id: 3, label: "All Students", icon: UsersIcon, link: "/usersdata" },
    { id: 4, label: "Fill Student", icon: VideosIcon, link: "/tiptap" },
];

const Sidebar = () => {
    const [toggleCollapse, setToggleCollapse] = useState(false);
    const [isCollapsible, setIsCollapsible] = useState(false);

    const router = useRouter();

    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success("Logged-out successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const wrapperClasses = classNames(`h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col ${!toggleCollapse ? "w-80" : "w-20"}`);
    const collapseIconClasses = classNames("p-4 rounded bg-light-lighter absolute right-0", { "rotate-180": toggleCollapse, });
    const getNavItemClasses = () => { return classNames("flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",); };

    const onMouseOver = () => { setIsCollapsible(!isCollapsible); };
    const handleSidebarToggle = () => { setToggleCollapse(!toggleCollapse); };

    return (
        <div
            className={wrapperClasses}
            onMouseEnter={onMouseOver}
            onMouseLeave={onMouseOver}
            style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
        >
            <div className="flex flex-col">
                <div className="flex items-center justify-between relative">
                    <div className="flex items-center pl-1 gap-4">
                        <LogoIcon />
                        <span className={classNames("mt-2 text-2xl font-medium text-text", { hidden: toggleCollapse, })}>
                            PICT
                        </span>
                    </div>
                    {isCollapsible && (
                        <button className={collapseIconClasses} onClick={handleSidebarToggle}>
                            <CollapsIcon />
                        </button>
                    )}
                </div>

                {/* <div className="flex flex-col items-start mt-24">
                {menuItems.map(({ icon: Icon, ...menu }) => {
                        return (
                            <div className={getNavItemClasses()}>
                                <a href={menu.link} className="flex py-6 px-3 items-center w-full h-full">
                                    <span style={{ width: "2.5rem" }}><Icon /></span>
                                    {!toggleCollapse &&
                                        (<span className={classNames("text-2xl font-normal text-text-light")}>{menu.label}</span>)}
                                </a>
                            </div>
                        );
                    })}
                </div> */}
                <div className="flex flex-col items-start mt-24">
                    {menuItems.map(({ icon: Icon, ...menu }, index) => (
                        <div key={index} className={getNavItemClasses()}>
                            <a href={menu.link} className="flex py-6 px-3 items-center w-full h-full">
                                <span style={{ width: "2.5rem" }}>
                                    <Icon />
                                </span>
                                {!toggleCollapse && (
                                    <span className={classNames("text-2xl font-normal text-text-light")}>
                                        {menu.label}
                                    </span>
                                )}
                            </a>
                        </div>
                    ))}
                </div>

            </div>

            <div className={`${getNavItemClasses()} px-3 py-4`}>
                <span style={{ width: "2.5rem" }}>
                    <a onClick={logout}> <LogoutIcon /> </a>
                </span>
                {!toggleCollapse && (
                    <span className={classNames("text-md font-medium text-text-light")}> Logout </span>
                )}
            </div>
        </div>
    );
};

export default Sidebar;