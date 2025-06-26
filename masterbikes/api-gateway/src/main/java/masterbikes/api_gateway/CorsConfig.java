package masterbikes.api_gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.config.WebFluxConfigurerComposite;

//@Configuration
//public class CorsConfig {

    //@Bean
    //public WebFluxConfigurer corsConfigurer() {
        //return new WebFluxConfigurerComposite() {
            //@Override
            //public void addCorsMappings(CorsRegistry registry) {
                //registry.addMapping("/**")
                        //.allowedOrigins("http://localhost:3000") // ← Cambia esto si usas otro frontend
                        //.allowedMethods("*")
                        //.allowedHeaders("*");
            //}
        //};
    //}
//}