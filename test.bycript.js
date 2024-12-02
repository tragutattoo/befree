const bcrypt = require('bcryptjs');

const testHash = async () => {
    try {
        const password = "minhasenha123";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Senha original:", password);
        console.log("Senha hashada:", hashedPassword);
    } catch (error) {
        console.error("Erro ao gerar hash:", error);
    }
};

testHash();
