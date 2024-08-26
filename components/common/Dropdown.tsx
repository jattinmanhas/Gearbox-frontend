"use client";
import { FC } from "react"
import { userStore } from "@/store/user";
import { useStore } from "zustand";
import { logout } from "@/api/auth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

type Props = {
    username: string
}

export const Dropdown: FC<Props> = ({username}: Props) => {
    const clearUser = useStore(userStore, (state) => state.clearUser);

    const handleLogout = () => {
      clearUser();
      logout();
    }

  return (
    <div className="bg-neutral-900">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          {username}
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-neutral-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Edit
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Duplicate
            </button>
          </MenuItem>
          {/* <div className="my-1 h-px bg-white" /> */}
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Archive
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-red-500"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
