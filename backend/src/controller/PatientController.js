const Patient = require('../models/Patient');
const { validateBr } = require('js-brasil');

module.exports = {

    async store(req, res){

        const { fistName, lastName, dateOfBirth, gender, maritalStatus, address, neighborhood, city, uf, 
        zipCode, homePhone, phoneNumber, email, profession, id, cpf, mothersName, fathersName, responsible} = req.body;
        
        //valida o cpf
        const cpfValidate = validateBr.cpf(cpf);

        //valida o CEP(zipCode)
        const cepValidate = validateBr.cep(zipCode);

        //senão for valido, ele retorna um erro para o servidor, porem essa verificação será feita tmb no frontend
        if (!cpfValidate){
            return res.status(400).json({ error: 'CPF Inválido' })
        };

        if (!cepValidate){
            return res.status(400).json({ error: 'CEP Inválido' })
        };
    
        //procura algum CPF como esse no banco
        let patient = await Patient.findOne({ cpf });

        //senao existir nenhum CPF como esse no banco e o CPF for válido, entao ele cria um novo paciente.
        if (!patient && cpfValidate && cepValidate){
            patient = await Patient.create({
                fistName,
                lastName,
                dateOfBirth, 
                gender, 
                maritalStatus, 
                address, 
                neighborhood, 
                city, 
                uf, 
                zipCode, 
                homePhone, 
                phoneNumber, 
                email, 
                profession, 
                id, 
                cpf, 
                mothersName, 
                fathersName, 
                responsible
            });  
        }
               
        return res.json(patient);
    }
};