package com.weiyi.Revshop.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.weiyi.Revshop.DTO.ProductDTO;
import com.weiyi.Revshop.entity.Product;
import com.weiyi.Revshop.entity.SellerProfile;
import com.weiyi.Revshop.repository.ProductRepository;
import com.weiyi.Revshop.repository.SellerProfileRepository;
import com.weiyi.Revshop.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @Autowired
    private SellerProfileRepository sellerProfileRepository;

    @Autowired
    private ProductRepository productRepository;

    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    //get seller product
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<ProductDTO>> getProductsBySellerId(@PathVariable Long sellerId) {
        List<Product> products = productService.getProductsBySellerId(sellerId);
        List<ProductDTO> productDTOs = products.stream()
            .map(ProductDTO::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(productDTOs);
    }

    //update seller product
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable("id") Long productId, @RequestBody Product updatedProduct) {
        productService.updateProduct(productId, updatedProduct);
        return ResponseEntity.ok("Product updated successfully");
    }

    //delete product
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProduct(
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("price") Double price,
        @RequestParam("category") String category,
        @RequestParam("discountedPrice") Double discountedPrice,
        @RequestParam("quantity") Integer quantity,
        @RequestParam("threshold") Integer threshold,
        @RequestParam("seller_id") Long sellerId,
        @RequestParam(value = "image", required = false) MultipartFile image
    ) {
    try {
        System.out.println("Received Data:");
        System.out.println("Name: " + name);
        System.out.println("Description: " + description);
        System.out.println("Price: " + price);
        System.out.println("Seller ID: " + sellerId);
        System.out.println("Image: " + (image != null ? image.getOriginalFilename() : "No image uploaded"));
        // Find seller by seller_id
        Optional<SellerProfile> sellerProfileOpt = sellerProfileRepository.findById(sellerId);
        if (sellerProfileOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid seller ID");
        }
        SellerProfile sellerProfile = sellerProfileOpt.get();

        // Create new product
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setDiscountedPrice(discountedPrice);
        product.setQuantity(quantity);
        product.setThreshold(threshold);
        product.setSeller(sellerProfile);

        // Handle image upload (Optional)
        if (image != null && !image.isEmpty()) {
            String imageUrl = saveImage(image);
            product.setImageUrl(imageUrl); // Ensure your entity has this field
        }

        // Save product
        productRepository.save(product);
        return ResponseEntity.ok("Product created successfully!");

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating product: " + e.getMessage());
    }
}

    private static final String UPLOAD_DIR = "uploads/";

    private String saveImage(MultipartFile image) throws IOException {
    if (image.isEmpty()) {
        throw new IOException("File is empty");
    }

    // Ensure the directory exists
    Path uploadPath = Paths.get(UPLOAD_DIR);
    if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
    }

    // Create a unique filename
    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
    Path filePath = uploadPath.resolve(fileName);

    // Save the file
    Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

    // Return the path as a string (you can modify it to return a full URL if needed)
    return UPLOAD_DIR + fileName;
}

}
