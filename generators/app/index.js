var Generator = require('yeoman-generator'),
    chalk = require('chalk');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}

  async prompting() {
    this.answers = await this.prompt([{
      type   : 'input',
      name   : 'templatename',
      message: 'Your email template\'s name'
    }, {
      type   : 'input',
      name   : 'version',
      message: 'Your template\'s version',
      default: '1.0.0'
    }, {
      type   : 'input',
      name   : 'repository',
      message: 'Your template\'s repository'
    }, {
      type   : 'input',
      name   : 'author',
      message: 'Your name',
      store  : true
    }, {
      type   : 'input',
      name   : 'email',
      message: 'Your email',
      store  : true
    }, {
      type   : 'input',
      name   : 'license',
      message: 'Your theme\'s license',
      default: 'MIT'
    }, {
      type   : 'confirm',
      name   : 'private',
      message: 'Is this project private?',
      default: true
    }]);

    this.answers.templatesafe = this.answers.templatename.replace(/\s+/g, '-').toLowerCase();
  }

  writing() {
    this.log(chalk.bold.green('\n\rCreating ' + ((this.answers.private) ? 'private' : 'public') + ' theme ' + this.answers.templatename + 
      '(' + this.answers.repository + ')' +
      ' version ' + this.answers.version +
      ' by ' + this.answers.author + '(' + this.answers.email + ')' +
      ' with the ' + this.answers.license + ' license\n\r'));
  }

  install() {
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'));

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        name : this.answers.templatename
      });

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name      : this.answers.templatesafe,
        version   : this.answers.version,
        repository: this.answers.repository,
        author    : this.answers.author,
        email     : this.answers.email,
        license   : this.answers.license,
        private   : this.answers.private
      }
    );

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      {
        name      : this.answers.templatesafe,
        version   : this.answers.version,
        repository: this.answers.repository,
        author    : this.answers.author,
        email     : this.answers.email,
        license   : this.answers.license,
        private   : this.answers.private
      }
    );

    this.fs.copyTpl(
      this.templatePath('.bowerrc'),
      this.destinationPath('.bowerrc'));

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'));
    this.installDependencies();

    this.fs.copyTpl(
      this.templatePath('style.scss'),
      this.destinationPath('src/scss/style.scss'));

    this.fs.copyTpl(
      this.templatePath('script.js'),
      this.destinationPath('src/js/script.js'));
  }

  end() {
    this.spawnCommand('gulp');
  }
};