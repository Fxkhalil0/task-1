import React from "react";
import style from './SideMenu.module.css'



function SideMenu() {
    return (
        <div className={style["sidemenu__preview"]}>
            <div className={style["icon__div"]}>
                <i class="fa-solid fa-bars" style={{ color: '#000000;' }}></i>
                <div className={style["icon__group"]}>
                    <i class='bx bx-home'></i>
                    <i class="fa-regular fa-rectangle-list" style={{ color: '#000000;' }}></i>
                </div>
                <p>NT</p>
            </div>
        </div>
    );
}

export default SideMenu;