import Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.min': 'O nome deve ter pelo menos 3 caracteres.',
    }),
    description: Joi.string().min(3).max(500).required().messages({
        'string.min': 'A descrição deve ter pelo menos 3 caracteres.',
    }),
    price: Joi.number().precision(2).min(0).required(),
    stock: Joi.number().integer().min(0).required().messages({
        'number.min': 'O valor do estoque precisa ser maior ou igual a zero.',
    }),
});