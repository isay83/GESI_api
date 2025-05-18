import * as forge from "node-forge";

const saltLength = 32;
const iterations = 10000;
const keyLength = 32;

export class PasswordService {
    /**
     * Crea un hash de contraseña con un salt aleatorio
     * @param password La contraseña a hashear
     * @returns String en formato "salt:hash"
     */
    static hashPassword(password: string): { passwordHash: string, salt: string } {
        const salt = forge.random.getBytesSync(saltLength);
        const saltBase64 = forge.util.encode64(salt);
        const derivedKey = forge.pkcs5.pbkdf2(password, salt, iterations, keyLength);
        const derivedKeyBase64 = forge.util.encode64(derivedKey);

        return {
            passwordHash: derivedKeyBase64,
            salt: saltBase64
        };
    }

    /**
     * Verifica si la contraseña coincide con el hash almacenado
     * @param password La contraseña a verificar
     * @param storedHash El hash almacenado
     * @param storedSalt El salt almacenado
     * @returns true si la contraseña coincide, false en caso contrario
     */
    static verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
        try {
            const salt = forge.util.decode64(storedSalt);
            const newDerivedKey = forge.pkcs5.pbkdf2(password, salt, iterations, keyLength);
            const newDerivedKeyBase64 = forge.util.encode64(newDerivedKey);

            return newDerivedKeyBase64 === storedHash;
        } catch (error) {
            console.error("Error verifying password:", error);
            return false;
        }
    }
}