/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchNotifications,
  selectAllNotifications,
} from "../features/notifications/notificationsSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };
  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className='badge'>{numUnreadNotifications}</span>
    );
  }

  return (
    <nav>
      <section>
        <div className='nav__container'>
          <div className='nav__links'>
            <Link to='/'>Posts</Link>
            <Link to='/users'>Users</Link>
            <Link to='/notifications'>
              Notifications {unreadNotificationsBadge}
            </Link>
            <button
              className='nav__btn__refresh'
              onClick={fetchNewNotifications}>
              Refresh Notifications
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
};
