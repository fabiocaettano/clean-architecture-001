import express, { Request, Response } from "express";
import CreateProductUsecase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ProductPresenter from "../presenters/product.presenter";

export const productRoute = express.Router();

productRoute.put("/:id", async(req: Request, res: Response) => {
    const usecase = new CreateProductUsecase(new ProductRepository());
    try{    
        const productDto = {
            id: req.params.id,
            type: req.body.type,
            name : req.body.name,
            price: req.body.price
        }
        const output = await usecase.execute(productDto);
        res.send(output);
    }catch(err){    
        res.status(500).send(err);
    }
});
        


productRoute.post("/", async(req: Request, res: Response) => {
    const usecase = new CreateProductUsecase(new ProductRepository());
    try{
        const productDto = {
            type: req.body.type,
            name : req.body.name,
            price: req.body.price
        }
        const output = await usecase.execute(productDto);
        res.send(output);
    }catch(err){
        res.status(500).send(err);
    }
});

productRoute.get("/", async(req: Request, res: Response) => {
    const usecase = new ListProductUsecase(new ProductRepository());
    try{
        const output = await usecase.execute();
        res.format({                
            json: async () => res.send(output),                
            xml: async () => res.send(ProductPresenter.listXML(output)),
        });  
    }catch(err){
        res.status(500).send(err);
    }
});

productRoute.get("/:id", async(req: Request, res: Response) => {
    const usecase = new FindProductUseCase(new ProductRepository());
    try{
        const output = await usecase.execute({id: req.params.id});        
        res.format({    
            json: async () => res.send(output),    
            xml: async () => res.send(ProductPresenter.XML(output)),
        });  
    }catch(err){
        res.status(500).send(err);
    }
});
