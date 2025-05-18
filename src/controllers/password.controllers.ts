import { Request, Response } from 'express';
import { UserCredentials } from '../entities/UserCredentials';
import { User } from '../entities/User';

import { PasswordService } from '../services/password.services';

export const changePassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id, current_password, new_password } = req.body;

        if (!user_id || !current_password || !new_password) {
            return res.status(400).json({ message: "User ID, current password and new password are required" });
        }

        // Verificar que el usuario existe
        const user = await User.findOneBy({ user_id: parseInt(user_id) });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Obtener credenciales actuales
        const credentials = await UserCredentials.findOneBy({ user_id: parseInt(user_id) });
        if (!credentials) {
            return res.status(404).json({ message: "User credentials not found" });
        }

        // Verificar contraseña actual
        const isPasswordValid = PasswordService.verifyPassword(
            current_password,
            credentials.password_hash,
            credentials.salt
        );

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        // Generar nuevo hash y salt
        const { passwordHash, salt } = PasswordService.hashPassword(new_password);

        // Actualizar credenciales
        credentials.password_hash = passwordHash;
        credentials.salt = salt;
        await credentials.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_id, new_password } = req.body;

        if (!user_id || !new_password) {
            return res.status(400).json({ message: "User ID and new password are required" });
        }

        // Verificar que el usuario existe
        const user = await User.findOneBy({ user_id: parseInt(user_id) });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Obtener credenciales actuales
        const credentials = await UserCredentials.findOneBy({ user_id: parseInt(user_id) });
        if (!credentials) {
            return res.status(404).json({ message: "User credentials not found" });
        }

        // Este endpoint sería para administradores o para reinicio de contraseña,
        // por lo que no verificamos la contraseña actual

        // Generar nuevo hash y salt
        const { passwordHash, salt } = PasswordService.hashPassword(new_password);

        // Actualizar credenciales
        credentials.password_hash = passwordHash;
        credentials.salt = salt;
        await credentials.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};