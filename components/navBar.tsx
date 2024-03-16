'use client'

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Image} from "@nextui-org/react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Pagina Inicial",
    "Produto",
    "Requisição",
    "BenchMarking Log",
    "Configurações",
  ];



  return (
    <Navbar position='sticky' maxWidth='full' className="text-black bg-blue-400" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <p className="font-bold text-inherit px-2">Almoxarifado</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu  className="bg-blue-500 lg:w-1/6 sm:w-full" >
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={"foreground"}
              className={"text-white"}
              href={index === 3 ? 'Log' : index === 0 ? 'Home' : index === 1 ? 'Produto' : index === 2 ? 'Requisicao' : 'Config'}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
