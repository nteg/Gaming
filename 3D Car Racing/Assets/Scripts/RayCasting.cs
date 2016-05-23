using UnityEngine;
using System.Collections;

public class RayCasting : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {

        Vector3 forward = transform.TransformDirection(Vector3.forward);
        Ray ray = new Ray(transform.position, transform.forward);
        RaycastHit hit;
        if (Physics.Raycast(ray, out hit, 5)) {
            if (hit.collider != null)
            {
                Debug.DrawRay(transform.position, transform.position, Color.red);
            }
        }
	}
}
