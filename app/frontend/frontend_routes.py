#!/usr/bin/python3
"""This module contains the routes for the frontend"""

from app.models import storage
from werkzeug.urls import url_parse
from app.models.app_user import App_User
from flask import Flask, render_template, request, redirect, url_for
from flask import abort, current_app
from app.forms.forms import LoginForm, SignupForm
from flask_login import current_user, login_user
from flask_login import UserMixin, login_required, logout_user
from app.frontend import frontend
from flask_login import LoginManager
from app import login_manager
import logging

logger = logging.getLogger(__name__)

@login_manager.user_loader
def load_user(user_id):
    user = storage.one("App_User", id=user_id)
    if user:
        return user
    return None


@frontend.route('/')
def index():
    """
    Return the index html
    """
    logger.info('Mostrando con nustro propio logger')
    return render_template('index.html')


@frontend.route('/signup', methods=["GET", "Post"])
def signup():
    """
    Return the signup form html
    """
    if current_user.is_authenticated:
        return redirect(url_for('frontend.index'))
    form = SignupForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        password = form.password.data
        user = App_User(name=name,
                        email=email,
                        password=password)
        user.save()
        login_user(user, remember=False)
        next = request.args.get('next', None)
        if next:
            return redirect(next)
        return redirect(url_for('frontend.index'))
    return render_template('signup.html', form=form)


@frontend.route('/login', methods=["GET", "POST"])
def login():
    """
    Return the login form html
    """
    if current_user.is_authenticated:
        return redirect(url_for('frontend.index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = storage.one("App_User", email=form.email.data)
        if user and user.check_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            next_page = request.args.get('next')
            if not next_page or url_parse(next_page).netloc != '':
                next_page = url_for('frontend.index')
            return redirect(next_page)
    return render_template('login.html', form=form)


@frontend.route('/logout')
def logout():
    """Log the user out"""
    logout_user()
    return redirect(url_for('frontend.index'))


@frontend.route('/restricted')
@login_required
def restricte():
    return render_template('restricted.html')
