package bot.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

/**
 * A Chat.
 */
@Entity
@Table(name = "chats")
public class Chat  implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Size(max = 256)
	@Column(name = "mesg", length = 256)
	private String mesg;
	
	@Size(max = 50)
	@Column(name = "usuario", length = 50)
	private String usuario;

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMesg() {
		return mesg;
	}
	
	public void setMesg(String s){
		this.mesg = s;
	}

	

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Chat mesg = (Chat) o;
		if (mesg.id == null || id == null) {
			return false;
		}
		return Objects.equals(id, mesg.id);
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(id);
	}

	@Override
	public String toString() {
		return "Chat [id=" + id + ", mesg=" + mesg + ", usuario=" + usuario + "]";
	}

	
}
