// Função para inserir dados no banco de dados
async function insertData(client, dbName, collectionName, data) {
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        await collection.insertOne(data);
        console.log("Data inserida");
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

// Função para deletar dados do banco de dados
async function deleteData(client, dbName, collectionName, query) {
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        await collection.deleteOne(query);
        console.log("Deletado");
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

// Função para atualizar dados no banco de dados
async function updateData(client, dbName, collectionName, query, newData) {
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        delete newData.codigo;
        const result = await collection.updateOne(query, { $set: newData });
        if (result.modifiedCount === 1) {
            console.log("Dados alterados com sucesso.");
            return true;
        } else {
            console.log("Nenhum documento foi modificado.");
            return false;
        }
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

// Função para resgatar dados no banco de dados
async function searchData(client, dbName, collectionName, query) {
    try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const cursor = collection.find(query);
        const resultArray = await cursor.toArray();
        if (resultArray.length > 0) {
            console.log("Resultados encontrados:", resultArray);
            return resultArray;
        } else {
            console.log("Nenhum resultado encontrado.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao pesquisar dados:", error);
        throw error;
    }
}

module.exports = {
    insertData,
    deleteData,
    updateData,
    searchData
};