import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto';
import Product from '../../../domain/product/entity/product';

export default class FindProductUseCase {

    private productRepository: ProductRepositoryInterface;
  
    constructor(ProductRepository: ProductRepositoryInterface) {
        this.productRepository = ProductRepository;
    }

  async execute(input : InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);
    return OutputMapper.toOutput(product);
  }
}   

class OutputMapper {
  static toOutput(product: Product): OutputFindProductDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,      
    };
  }
}