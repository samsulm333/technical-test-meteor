-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Jan 2022 pada 10.12
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_meteor`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `rbacs`
--

CREATE TABLE `rbacs` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `route_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `rbacs`
--

INSERT INTO `rbacs` (`id`, `role_id`, `route_id`, `createdAt`, `updatedAt`) VALUES
(5, 1, 3, '2022-01-20 15:07:20', '2022-01-20 15:07:20'),
(6, 1, 4, '2022-01-20 15:07:20', '2022-01-20 15:07:20'),
(7, 1, 5, '2022-01-20 15:07:20', '2022-01-20 15:07:20'),
(8, 1, 6, '2022-01-20 15:29:53', '2022-01-20 15:29:53'),
(9, 1, 7, '2022-01-20 15:29:53', '2022-01-20 15:29:53'),
(10, 2, 6, '2022-01-20 15:29:53', '2022-01-20 15:29:53'),
(11, 2, 7, '2022-01-20 15:29:53', '2022-01-20 15:29:53'),
(12, 1, 8, '2022-01-20 15:44:11', '2022-01-20 15:44:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `createdAt`, `updatedAt`) VALUES
(1, 'ADMIN', '2022-01-20 11:38:12', '2022-01-20 11:38:12'),
(2, 'USER', '2022-01-20 11:38:12', '2022-01-20 11:38:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `route_name` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `routes`
--

INSERT INTO `routes` (`id`, `route_name`, `method`, `createdAt`, `updatedAt`) VALUES
(3, 'user', 'POST', '2022-01-20 15:05:38', '2022-01-20 15:05:38'),
(4, 'user', 'GET', '2022-01-20 15:05:38', '2022-01-20 15:05:38'),
(5, 'user', 'DELETE', '2022-01-20 15:06:23', '2022-01-20 15:06:23'),
(6, 'my-profile', 'GET', '2022-01-20 15:28:43', '2022-01-20 15:28:43'),
(7, 'my-profile', 'PATCH', '2022-01-20 15:28:43', '2022-01-20 15:28:43'),
(8, 'password', 'PATCH', '2022-01-20 15:43:48', '2022-01-20 15:43:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220120033406-create-role.js'),
('20220120033511-create-route.js'),
('20220120033616-create-rbac.js'),
('20220120042148-create-user.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`, `createdAt`, `updatedAt`) VALUES
(3, 'Super Admin', 'admin333@gmail.com', '$2b$10$68eEtIUEyMM6QalI0jNPe.lif/RQLS.VwjTw9zN.Jen42ifF2mnIC', 1, '2022-01-20 04:55:27', '2022-01-20 08:52:00'),
(4, 'rifandi', 'rifandi@mail.com', '$2b$10$2otpINirHqfDqRDy3Pj.R.hdFKZEEz3VJeVCekDJSBpAuyZX6I1nW', 2, '2022-01-20 05:33:54', '2022-01-20 05:33:54'),
(5, 'user 1', 'user1@mail.com', '$2b$10$yJE/MIzuwjGd9OCWbfdXDupkxWUlR/fV9ogN1aGpb/OoMYaPpGvX.', 2, '2022-01-20 08:16:54', '2022-01-20 08:16:54');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `rbacs`
--
ALTER TABLE `rbacs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `route_id` (`route_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `rbacs`
--
ALTER TABLE `rbacs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `rbacs`
--
ALTER TABLE `rbacs`
  ADD CONSTRAINT `rbacs_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rbacs_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
