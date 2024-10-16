package br.edu.utfpr.pb.pw44s.server.error;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.net.http.HttpResponse;
import java.util.Map;

@RestController
public class ErrorHandler implements ErrorController {

    private static final String ERROR_PATH = "/error";
    private final ErrorAttributes errorAttributes;

    public ErrorHandler(final ErrorAttributes errorAttributes) {
        this.errorAttributes = errorAttributes;
    }

    @RequestMapping(value = ERROR_PATH)
    public ApiError handleError(WebRequest webRequest, HttpServletResponse response) {
        Map<String, Object> attributes = errorAttributes.getErrorAttributes(webRequest,
                        ErrorAttributeOptions.of(ErrorAttributeOptions.Include.MESSAGE));

        if (attributes.get("status") == null) {
            attributes.put("status", response.getStatus());
        }

        String message = (String) attributes.get("message");
        String url = (String) attributes.get("path");
        int status = (Integer) attributes.get("status");

        return new ApiError(status, message, url);
    }


}
