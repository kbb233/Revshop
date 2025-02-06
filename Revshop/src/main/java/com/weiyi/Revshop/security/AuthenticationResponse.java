package com.weiyi.Revshop.security;

import com.weiyi.Revshop.entity.User.Role;

public class AuthenticationResponse {
    private String token;
    private Role role;
    private Long id;

    public AuthenticationResponse(String token,Role role,Long id) {
        this.token = token;
        this.role = role;
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
