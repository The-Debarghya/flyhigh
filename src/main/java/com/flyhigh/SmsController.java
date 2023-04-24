package com.flyhigh;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@RestController
public class SmsController {

    @PostMapping(value = "/sms/send", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> sendMessage(@RequestBody String message) {
        Twilio.init("", "");

        Message.creator(new PhoneNumber(""),
                new PhoneNumber(""), message).create();
        return new ResponseEntity<String>("Message sent successfully", HttpStatus.OK);
    }

}
