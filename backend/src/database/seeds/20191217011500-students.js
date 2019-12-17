module.exports = {
    up: queryInterface => {
        return queryInterface.bulkInsert(
            'students',
            [
                {
                    name: 'Katia Magalhães',
                    email: 'katia_mg@gmail.com',
                    age: 52,
                    weight: 55,
                    height: 1.72,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Rodrigo Dantas',
                    email: 'rdantas@outlook.com.br',
                    age: 22,
                    weight: 87,
                    height: 1.86,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Gabriel Dinis',
                    email: 'gdinis@gmail.com',
                    age: 17,
                    weight: 105,
                    height: 1.92,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: queryInterface => queryInterface.bulkDelete('students', null, {}),
};
